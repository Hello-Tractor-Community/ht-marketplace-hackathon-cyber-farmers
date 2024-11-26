from rest_framework import serializers
from .models import Tractor


class TractorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tractor
        fields = "__all__"
