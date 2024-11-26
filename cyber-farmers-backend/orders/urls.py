from django.urls import path
from . import views

urlpatterns = [
    path("purchase/", views.PurchaseCreateView.as_view(), name="create-purchase"),
    path("mpesa/validation/", views.mpesa_validation_callback, name="mpesa-validation"),
    path(
        "mpesa/confirmation/",
        views.mpesa_confirmation_callback,
        name="mpesa-confirmation",
    ),
]
