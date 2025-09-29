from rest_framework import serializers
from .models import MenuCategory, MenuItem

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = [
            'id',
            'name',          # base (español)
            'name_en',       # inglés
            'description',   # base (español)
            'description_en',
            'price',
            'is_active',
            'photo',
            'category',
        ]


class MenuCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuCategory
        fields = ["id", "name", "order", "name_en", "items"]
        read_only_fields = ["items"]

    def validate_name(self, value):
        cleaned_name = value.strip()
        if MenuCategory.objects.filter(name__iexact=cleaned_name).exists():
            raise serializers.ValidationError("⚠️ Ya existe una categoría con ese nombre.")
        return cleaned_name
