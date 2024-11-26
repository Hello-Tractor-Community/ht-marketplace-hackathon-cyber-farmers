from django.contrib.auth.models import AbstractUser
from django.db import models
from cloudinary.models import CloudinaryField
from django.core.exceptions import ValidationError


class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ("admin", "Admin"),
        ("seller", "Seller"),
        ("buyer", "Buyer"),
    ]

    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="buyer")
    profile_picture = CloudinaryField(
        "profile_pictures/",
        blank=True,
        default="https://th.bing.com/th/id/R.ac9a5b6feab8bed63cd5423a02d6d187?rik=rxIxeWM1jpfEVQ&pid=ImgRaw&r=0",
    )
    is_approved_seller = models.BooleanField(default=False)
    phone = models.CharField(max_length=15, blank=True)

    groups = models.ManyToManyField(
        "auth.Group",
        related_name="customuser_groups",
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="customuser_permissions",
        blank=True,
    )

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        return self.username

    def clean(self):
        if self.role == "seller" and not self.is_approved_seller:
            raise ValidationError("A seller must be marked as approved.")
        if self.role != "seller" and self.is_approved_seller:
            raise ValidationError("Only sellers can be marked as approved.")
        super().clean()
