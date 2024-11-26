from django.contrib import admin
from import_export.admin import (
    ImportExportModelAdmin,
)  # Note: Not ImportExportActionModelAdmin
from .models import Tractor
from .resources import TractorResource


@admin.register(Tractor)
class TractorAdmin(ImportExportModelAdmin):
    resource_class = TractorResource  # Updated with custom resource
    list_display = ("title", "seller", "price", "location", "is_approved")
    list_filter = ("is_approved", "brand", "location")
    search_fields = ("title", "description", "brand", "seller__username")
