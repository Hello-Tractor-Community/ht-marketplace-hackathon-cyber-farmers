from . import views
from django.urls import path

urlpatterns = [
    path("users/status/", views.AuthStatusView.as_view(), name="user-list"),
    path("users/register/", views.RegisterUserView.as_view(), name="register"),
    path("users/login/", views.LoginUserView.as_view(), name="login"),
    path("users/profile/", views.UserProfileView.as_view(), name="profile"),
    path(
        "users/change-password/",
        views.ChangePasswordView.as_view(),
        name="change-password",
    ),
    path("users/<int:id>/", views.UserByID.as_view(), name="user-detail"),
    path("users/logout/", views.LogoutUserView.as_view(), name="logout"),
    path(
        "users/refresh-token/", views.RefreshTokenView.as_view(), name="refresh-token"
    ),
    path("users/delete/", views.DeleteUserView.as_view(), name="delete-user"),
    path("users/update/", views.UpdateUserView.as_view(), name="update-user"),
    path("users/", views.UserListView.as_view(), name="user-list"),
    path("users/auth/google/", views.GoogleLoginView.as_view(), name="google-login"),
]
