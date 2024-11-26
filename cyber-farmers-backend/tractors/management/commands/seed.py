import csv
import random
from faker import Faker  # Import Faker
from django.core.management.base import BaseCommand
from tractors.models import Tractor
from users.models import CustomUser

DEFAULT_LOCATION = "Unknown"


class Command(BaseCommand):
    help = "Seed tractor data from CSV"

    def handle(self, *args, **kwargs):
        fake = Faker()  # Initialize Faker instance

        # Fetch the approved seller with 'seller' role
        seller = CustomUser.objects.filter(
            role="seller", is_approved_seller=True
        ).first()

        if not seller:
            self.stdout.write(
                self.style.ERROR("No approved seller found. Add one first.")
            )
            return

        csv_file_path = "assets/Asset_models_urls.csv"

        try:
            with open(csv_file_path, "r", encoding="utf-8") as file:
                reader = csv.DictReader(file)
                headers = [
                    field.strip().lower() for field in reader.fieldnames
                ]  # Normalize headers

                self.stdout.write(
                    self.style.NOTICE(f"Normalized Headers: {headers}")
                )  # Debugging: Check normalized headers

                for row in reader:
                    logo_url = row.get("tractor_model_logo_url", "").strip()
                    price = row.get("price", "").strip() or round(
                        random.uniform(5000, 20000), 2
                    )
                    model_name = (
                        row.get("model", "").strip() or fake.word().capitalize()
                    )  # Use Faker fallback

                    if model_name and logo_url:  # Ensure data integrity
                        Tractor.objects.create(
                            seller=seller,
                            price=float(price),
                            description=f"A {model_name} tractor available for sale. {fake.sentence(nb_words=10)}",
                            location=fake.city(),
                            hours_used=random.randint(0, 5000),  # Random usage hours
                            brand=model_name.split()[0],
                            image=logo_url,
                        )
            self.stdout.write(self.style.SUCCESS("Tractor data seeded successfully!"))

        except KeyError as ke:
            self.stdout.write(
                self.style.ERROR(
                    f"Key error: {ke}. Check if CSV headers match expected field names."
                )
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f"Error while processing the CSV file: {e}")
            )
