from django.contrib.auth import get_user_model

User = get_user_model()

for user in User.objects.all():
    if not user.password.startswith('pbkdf2_sha256$'):
        user.set_password(user.password)  # Hash the existing plain-text password
        user.save()

