from django.db import models
from users.models import CustomUser
from tractors.models import Tractor


class Review(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    tractor = models.ForeignKey(
        Tractor, related_name="reviews", on_delete=models.CASCADE
    )
    rating = models.IntegerField()
    comment = models.TextField()

    def __str__(self):
        return f"{self.user.username} - {self.rating}"
