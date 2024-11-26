# Generated by Django 5.1.3 on 2024-11-26 09:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("reviews", "0003_initial"),
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="review",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="reviews",
                to="users.customuser",
            ),
        ),
    ]