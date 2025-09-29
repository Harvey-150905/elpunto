from django.urls import path
from .views import health
from rest_framework import routers
from .views import (
    health,
    MenuCategoryViewSet,
    MenuItemViewSet,
)

router = routers.DefaultRouter()
router.register(r"menu/categories", MenuCategoryViewSet)
router.register(r"menu/items", MenuItemViewSet)

urlpatterns = [
    path("health/", health),
]

urlpatterns += router.urls
