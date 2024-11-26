from django.db import models
from django.core.validators import MinValueValidator
from users.models import CustomUser
from tractors.models import Tractor


class Purchase(models.Model):
    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Completed", "Completed"),
        ("Cancelled", "Cancelled"),
    ]

    buyer = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="purchases"
    )
    tractor = models.ForeignKey(
        Tractor, on_delete=models.CASCADE, related_name="purchases"
    )
    purchase_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Pending")
    total_amount = models.DecimalField(
        max_digits=10, decimal_places=2, validators=[MinValueValidator(0.01)]
    )

    def __str__(self):
        return f"{self.buyer.username} - {self.tractor.title}"

    class Meta:
        ordering = ["-purchase_date"]
        verbose_name = "Purchase"
        verbose_name_plural = "Purchases"
