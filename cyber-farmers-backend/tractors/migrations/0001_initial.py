# Generated by Django 5.1.3 on 2024-11-26 08:30

import cloudinary.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Tractor",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=100)),
                ("description", models.TextField()),
                ("price", models.DecimalField(decimal_places=2, max_digits=10)),
                ("location", models.CharField(max_length=100)),
                ("hours_used", models.IntegerField()),
                ("brand", models.CharField(max_length=50)),
                (
                    "image",
                    cloudinary.models.CloudinaryField(
                        blank=True, max_length=255, verbose_name="image"
                    ),
                ),
                (
                    "videos",
                    cloudinary.models.CloudinaryField(
                        blank=True, max_length=255, verbose_name="videos"
                    ),
                ),
                ("is_approved", models.BooleanField(default=False)),
            ],
        ),
    ]