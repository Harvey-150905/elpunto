from django.shortcuts import render
from rest_framework import viewsets
from .models import MenuCategory, MenuItem
from .serializers import MenuCategorySerializer, MenuItemSerializer

# Create your views here.
from django.http import JsonResponse

def health(request):
    return JsonResponse({"status": "ok", "service": "elpunto-api"})



class MenuCategoryViewSet(viewsets.ModelViewSet):
    queryset = MenuCategory.objects.all()
    serializer_class = MenuCategorySerializer


class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
