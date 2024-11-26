from . import views
from django.urls import path

urlpatterns = [
    path("reviews/", views.ReviewListCreateView.as_view(), name="review-list-create"),
    path(
        "reviews/<int:pk>/",
        views.ReviewRetrieveUpdateDeleteView.as_view(),
        name="review-detail",
    ),
]
