from django.urls import path, re_path
from . import views
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Swagger Schema Configuration
schema_view = get_schema_view(
    openapi.Info(
        title="Cyber Farmers API",
        default_version="v1",
        description="API documentation for Cyber Farmers",
        terms_of_service="https://www.example.com/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path(
        "tractors/", views.TractorListCreateView.as_view(), name="tractor-list-create"
    ),
    path(
        "tractors/<int:pk>/",
        views.TractorRetrieveUpdateDeleteView.as_view(),
        name="tractor-detail",
    ),
    # Swagger and Redoc URLs
    re_path(
        r"^swagger/$",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    re_path(
        r"^redoc/$", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"
    ),
]
