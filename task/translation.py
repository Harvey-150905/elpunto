from modeltranslation.translator import register, TranslationOptions
from .models import MenuItem, MenuCategory

@register(MenuItem)
class MenuItemTranslationOptions(TranslationOptions):
    fields = ('name', 'description',)
    required_languages = ('en',)  # Solo pedirá inglés, no español

@register(MenuCategory)
class MenuCategoryTranslationOptions(TranslationOptions):
    fields = ('name',)
    required_languages = ('en',)
