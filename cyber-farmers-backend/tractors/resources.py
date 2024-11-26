from import_export import resources, fields
from import_export.widgets import ForeignKeyWidget
from .models import Tractor
from users.models import CustomUser
from faker import Faker


fake = Faker()  # Initialize Faker instance


class TractorResource(resources.ModelResource):
    seller = fields.Field(
        column_name="seller_username",
        attribute="seller",
        widget=ForeignKeyWidget(CustomUser, "username"),  # Match seller by username
    )

    class Meta:
        model = Tractor
        import_id_fields = ["title"]
        exclude = ("id",)
        fields = (
            "title",
            "description",
            "price",
            "location",
            "hours_used",
            "brand",
            "seller",
            "image",
            "is_approved",
        )
        # Removed 'import_id_fields'

    # Provide default values or validate data


def before_import_row(self, row, **kwargs):
    # Handle missing seller_username
    if not row.get("seller_username"):
        # Generate or assign a random seller (ensure at least one seller exists in the DB)
        random_seller = (
            CustomUser.objects.filter(role="seller", is_approved_seller=True)
            .order_by("?")
            .first()
        )
        if random_seller:
            row["seller_username"] = random_seller.username
        else:
            # If no seller exists, create a fake seller for development purposes
            seller = CustomUser.objects.create_user(
                username=fake.user_name(),
                email=fake.email(),
                password="password123",
                role="seller",
                is_approved_seller=True,
            )
            row["seller_username"] = seller.username

    # Handle missing price with random values
    if not row.get("price"):
        row["price"] = round(
            fake.random_number(digits=5), 2
        )  # Random price between 0 - 99999.99

    # Handle missing location
    if not row.get("location"):
        row["location"] = fake.city()

    # Handle missing description
    if not row.get("description"):
        row["description"] = fake.sentence(nb_words=10)

        # Add default values if needed
        row["is_approved"] = row.get(
            "is_approved", False
        )  # Default to False if missing
