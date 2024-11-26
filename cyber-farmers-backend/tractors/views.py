from rest_framework import generics, permissions
from rest_framework.filters import SearchFilter
from .models import Tractor
from .serializers import TractorSerializer


# CRUD Views for Tractors with Search functionality
class TractorListCreateView(generics.ListCreateAPIView):
    queryset = Tractor.objects.all()
    serializer_class = TractorSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [SearchFilter]
    search_fields = [
        "name",
        "model",
        "seller__username",
    ]

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)


class TractorRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tractor.objects.all()
    serializer_class = TractorSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
