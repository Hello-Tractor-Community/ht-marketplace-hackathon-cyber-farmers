from django.db import models
from users.models import CustomUser
from cloudinary.models import (
    CloudinaryField,
)


class Tractor(models.Model):
    seller = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, limit_choices_to={"role": "seller"}
    )
    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=100)
    hours_used = models.IntegerField()
    brand = models.CharField(max_length=50)
    image = CloudinaryField("image", blank=True)
    videos = CloudinaryField("videos", blank=True)
    is_approved = models.BooleanField(default=False)

    def __str__(self):
        return self.title


# # Dealer Model
# class Dealer(models.Model):
#     name = models.CharField(max_length=255)
#     region = models.CharField(max_length=100)
#     contact_info = models.EmailField()
#     services = models.TextField()  # Comma-separated list
#     rating = models.FloatField()
#     promotions = models.TextField()  # Comma-separated list

#     def __str__(self):
#         return self.name


# # Listing Model
# class Listing(models.Model):
#     title = models.CharField(max_length=255)
#     description = models.TextField()
#     category = models.CharField(max_length=100)
#     images = models.TextField()  # Comma-separated list
#     price = models.IntegerField()
#     location = models.CharField(max_length=100)
#     age = models.IntegerField()
#     hours_used = models.IntegerField()
#     seller = models.ForeignKey(
#         CustomUser, related_name="listings", on_delete=models.CASCADE
#     )
#     specification = models.JSONField()

#     def __str__(self):
#         return self.title


# class Transaction(models.Model):
#     STATUS_CHOICES = [
#         ("COMPLETED", "Completed"),
#         ("PENDING", "Pending"),
#     ]
#     listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
#     buyer = models.ForeignKey(
#         CustomUser, related_name="transactions", on_delete=models.CASCADE
#     )
#     seller = models.ForeignKey(
#         CustomUser, related_name="sales", on_delete=models.CASCADE
#     )
#     price = models.IntegerField()
#     status = models.CharField(max_length=10, choices=STATUS_CHOICES)

#     def __str__(self):
#         return f"Transaction {self.id} - {self.status}"
