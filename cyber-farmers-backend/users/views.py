from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from .serializers import UserSerializer
from django.core.mail import send_mail
from django.conf import settings
import threading
from django.db import transaction
from django.shortcuts import get_object_or_404
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.models import SocialLogin
from allauth.socialaccount.providers import registry
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from allauth.socialaccount.models import SocialAccount


# Async email sending with error handling
def send_welcome_email_async(user_email):
    try:
        send_mail(
            subject="Welcome to Hello Tractor!",
            message="Thank you for signing up on Hello Tractor.",
            from_email=settings.EMAIL_HOST,
            recipient_list=[user_email],
            fail_silently=False,
        )
        return True  # Return True if email is sent successfully
    except Exception as e:
        print(f"Error sending email: {e}")
        return False  # Return False if email sending fails


class RegisterUserView(APIView):
    serializer_class = UserSerializer

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                # Using transaction to ensure the user is created only if the email is sent successfully
                with transaction.atomic():
                    user = serializer.save()

                    # Start a thread to send the email asynchronously
                    email_thread = threading.Thread(
                        target=send_welcome_email_async, args=(user.email,)
                    )
                    email_sent = email_thread.run()

                    if not email_sent:
                        # If the email sending fails, rollback the transaction and do not create the user
                        raise Exception(
                            "Failed to send the welcome email. User registration rolled back."
                        )

                    # If everything is successful, return success response
                    return Response(
                        {"message": "User registered successfully, and email sent."},
                        status=201,
                    )

            except Exception as e:
                # Rollback user creation if any exception occurs (including email failure)
                return Response({"message": str(e)}, status=400)
        else:
            return Response(serializer.errors, status=400)


class LogoutUserView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "User logged out successfully"})
        except Exception as e:
            return Response(status=400)


class LoginUserView(APIView):
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]

        user = CustomUser.objects.get(email=email)
        if user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                }
            )
        return Response({"message": "Invalid credentials"}, status=401)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        current_password = request.data["current_password"]
        new_password = request.data["new_password"]

        if user.check_password(current_password):
            user.set_password(new_password)
            user.save()
            return Response({"message": "Password changed successfully"})
        return Response({"message": "Invalid credentials"}, status=400)


class UpdateUserView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User updated successfully"})
        return Response(serializer.errors, status=400)


class DeleteUserView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        user.delete()
        return Response({"message": "User deleted successfully"})


class UserListView(APIView):
    # permission_classes = []

    def get(self, request):
        users = CustomUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class UserByID(APIView):
    # Uncomment this line and set appropriate permissions for production
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request, id):
        # Use get_object_or_404 for better error handling
        user = get_object_or_404(CustomUser, id=id)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RefreshTokenView(APIView):
    def post(self, request):
        refresh_token = request.data["refresh_token"]
        token = RefreshToken(refresh_token)
        access_token = str(token.access_token)
        return Response({"access_token": access_token})


class AuthStatusView(APIView):
    """
    Check if user is authenticated and return user details else false 401
    """

    def get(self, request):
        if request.user.is_authenticated:
            user = request.user
            serializer = UserSerializer(user)
            return Response(serializer.data)
        return Response(status=401)


class GoogleLoginView(APIView):
    def post(self, request, *args, **kwargs):
        token = request.data.get("token")
        if not token:
            return Response(
                {"detail": "Token is required."}, status=status.HTTP_400_BAD_REQUEST
            )

        # Create a Google OAuth2 adapter instance
        try:
            adapter = GoogleOAuth2Adapter()
            sociallogin = adapter.parse_token(token)
            sociallogin.token = sociallogin.get_token()
            user = sociallogin.user
            sociallogin.save()

            # You can now log in the user
            login(request, user)
            return Response({"detail": "Login successful."}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
