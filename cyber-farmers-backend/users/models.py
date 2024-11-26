from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.exceptions import ValidationError
from cloudinary.models import (
    CloudinaryField,
)  # Alternative to RawMediaCloudinaryStorage


class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ("admin", "Admin"),
        ("seller", "Seller"),
        ("buyer", "Buyer"),
    ]

    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="buyer")
    profile_picture = CloudinaryField("profile_pictures/", blank=True)
    is_approved_seller = models.BooleanField(default=False)
    phone = models.CharField(max_length=15, blank=True)
    groups = models.ManyToManyField(
        "auth.Group",
        related_name="customuser_groups",
        blank=True,
        help_text="The groups this user belongs to.",
        verbose_name="groups",
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="customuser_permissions",
        blank=True,
        help_text="Specific permissions for this user.",
        verbose_name="user permissions",
    )

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        return self.username

    def get_role_display(self):
        return dict(self.ROLE_CHOICES).get(self.role, self.role)

    def get_full_name(self):
        return (
            f"{self.first_name} {self.last_name}"
            if self.first_name or self.last_name
            else self.username
        )

    def clean(self):
        if self.role == "seller" and not self.is_approved_seller:
            raise ValidationError("A seller must be marked as approved.")
        if self.role != "seller" and self.is_approved_seller:
            raise ValidationError("Only sellers can be marked as approved.")
        super().clean()
