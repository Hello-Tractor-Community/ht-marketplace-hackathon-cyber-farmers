from django.core.management.base import BaseCommand
from users.models import CustomUser
from tractors.models import Tractor
from reviews.models import Review
import random
from faker import Faker


class Command(BaseCommand):
    help = "Seed the database with sample data"

    def handle(self, *args, **kwargs):
        fake = Faker()

        def create_approved_seller():
            approved_seller = CustomUser.objects.filter(
                role="seller", is_approved_seller=True
            ).first()
            if not approved_seller:
                approved_seller = CustomUser.objects.create_user(
                    username=fake.user_name(),
                    email=fake.email(),
                    password="password123",
                    role="seller",
                    is_approved_seller=True,
                    phone=fake.phone_number(),
                )
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Created approved seller: {approved_seller.username}"
                    )
                )
            return approved_seller

        def create_users(n=10):
            for _ in range(n):
                role = random.choice(["buyer", "seller"])
                is_approved_seller = role == "seller" and random.choice([True, False])
                CustomUser.objects.create_user(
                    username=fake.user_name(),
                    email=fake.email(),
                    password="password123",
                    role=role,
                    is_approved_seller=is_approved_seller,
                    phone=fake.phone_number(),
                )

        def create_tractors(n=15):
            approved_seller = create_approved_seller()
            sellers = CustomUser.objects.filter(role="seller", is_approved_seller=True)
            for _ in range(n):
                Tractor.objects.create(
                    seller=random.choice(sellers),
                    title=fake.word().capitalize() + " Tractor",
                    description=fake.text(),
                    price=round(random.uniform(1000, 50000), 2),
                    location=fake.city(),
                    hours_used=random.randint(100, 10000),
                    brand=fake.company(),
                )

        def create_reviews(n=20):
            buyers = CustomUser.objects.filter(role="buyer")
            tractors = Tractor.objects.all()
            if not tractors.exists():
                self.stdout.write(
                    self.style.WARNING("No tractors found. Add tractors first.")
                )
                return
            for _ in range(n):
                Review.objects.create(
                    user=random.choice(buyers),
                    tractor=random.choice(tractors),
                    rating=random.randint(1, 5),
                    comment=fake.text(),
                )

        # Run all creation functions
        create_users()
        create_tractors()
        create_reviews()
        self.stdout.write(self.style.SUCCESS("Database seeded successfully."))
