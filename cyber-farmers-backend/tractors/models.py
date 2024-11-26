from django.db import models
from users.models import CustomUser
from cloudinary.models import CloudinaryField


class Tractor(models.Model):
    seller = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        limit_choices_to={"role": "seller"},
        related_name="tractors",
    )
    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=100)
    hours_used = models.PositiveIntegerField()
    brand = models.CharField(max_length=50)
    image = CloudinaryField(
        "images",
        default="https://th.bing.com/th/id/R.dad5ba00175c745c791daf38577a4641?rik=o8VwnymG%2b2xzlg&pid=ImgRaw&r=0",
    )
    videos = CloudinaryField("videos", blank=True)
    is_approved = models.BooleanField(default=False)

    def __str__(self):
        return self.title
