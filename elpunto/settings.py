"""
Django settings for elpunto project.
Configuración flexible: local (SQLite) o Render (PostgreSQL + Cloudinary)
"""

import os
from pathlib import Path
import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent

# ===============================
# 🔐 SECRET KEY
# ===============================
SECRET_KEY = os.environ.get(
    "SECRET_KEY", "django-insecure-8+r8y2dpr)9*x(*j(0tm_+mps4%z*mffa&_^2w5i_!38txzu$u"
)

# ===============================
# ⚙️ DEBUG
# ===============================
DEBUG = os.environ.get("DEBUG", "True").lower() == "true"

# ===============================
# 🌐 HOSTS
# ===============================
ALLOWED_HOSTS = ["*"]

# ===============================
# 🤝 CORS
# ===============================
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [
    "https://elpunto-frontend.vercel.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# ===============================
# 🧩 APPS
# ===============================
INSTALLED_APPS = [
    # Admin UI
    "jazzmin",

    # Core
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Translations
    "modeltranslation",

    # Third-party
    "rest_framework",
    "corsheaders",
    "cloudinary",
    "cloudinary_storage",

    # Local apps
    "task",
]

# ===============================
# ⚙️ MIDDLEWARE
# ===============================
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",       # 👈 Importante que esté antes
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "elpunto.urls"

# ===============================
# 🧱 TEMPLATES
# ===============================
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "elpunto.wsgi.application"

# ===============================
# 🗄️ DATABASE
# ===============================
RENDER = os.environ.get("RENDER", "False").lower() == "true"

if RENDER:
    # Render usa PostgreSQL
    DATABASES = {
        "default": dj_database_url.config(conn_max_age=600)
    }
else:
    # Local usa SQLite
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }

# ===============================
# 🔑 AUTH
# ===============================
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# ===============================
# 🌍 I18N
# ===============================
LANGUAGE_CODE = "es"

LANGUAGES = [
    ("es", "Español"),
    ("en", "English"),
]

MODELTRANSLATION_FALLBACK_LANGUAGES = ("es",)
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# ===============================
# 🧱 STATIC FILES
# ===============================
STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# ===============================
# 🖼️ MEDIA (Cloudinary / Local)
# ===============================
if RENDER:
    # Render → Cloudinary
    CLOUDINARY_STORAGE = {
        "CLOUD_NAME": os.environ.get("CLOUDINARY_CLOUD_NAME"),
        "API_KEY": os.environ.get("CLOUDINARY_API_KEY"),
        "API_SECRET": os.environ.get("CLOUDINARY_API_SECRET"),
    }
    DEFAULT_FILE_STORAGE = "cloudinary_storage.storage.MediaCloudinaryStorage"
else:
    # Local → carpeta /media
    MEDIA_URL = "/media/"
    MEDIA_ROOT = os.path.join(BASE_DIR, "media")

# ===============================
# ⚙️ DRF
# ===============================
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.AllowAny"],
}

# ===============================
# 🎨 JAZZMIN
# ===============================
JAZZMIN_SETTINGS = {
    "site_title": "El Punto Bar",
    "site_header": "Panel de Administración",
    "welcome_sign": "Bienvenido al panel de El Punto Bar",
    "site_brand": "El Punto Bar",
}

# ===============================
# 🔢 AUTO FIELD
# ===============================
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
