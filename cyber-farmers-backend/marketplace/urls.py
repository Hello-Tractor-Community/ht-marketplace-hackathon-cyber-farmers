from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from dj_rest_auth.registration.views import SocialLoginView
from dj_rest_auth.views import PasswordResetView, PasswordResetConfirmView

admin.site.site_title = "Cyber Farmers"
admin.site.site_header = "Cyber Farmers Admin"
from mpesa.urls import mpesa_urls


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/auth/google/", SocialLoginView.as_view(), name="google_login"),
    path("api/password/reset/", PasswordResetView.as_view(), name="password_reset"),
    path(
        "api/password/reset/confirm/",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    path("mpesa/", include(mpesa_urls)),
    path("users/", include("users.urls")),
    path("reviews/", include("reviews.urls")),
    path("tractors/", include("tractors.urls")),
    path("accounts/", include("allauth.urls")),
    path("orders/", include("orders.urls")),
]
