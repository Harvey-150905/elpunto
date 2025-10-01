import os
from pathlib import Path
import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent

# -----------------------------
# 🔐 SECRET KEY
# -----------------------------
SECRET_KEY = os.environ.get(
    "SECRET_KEY",
    "django-insecure-8+r8y2dpr)9*x(*j(0tm_+mps4%z*mffa&_^2w5i_!38txzu$u",
)

# -----------------------------
# ⚙️ DEBUG
# -----------------------------
DEBUG = os.environ.get("DEBUG", "True").lower() == "true"

# -----------------------------
# 🌐 ALLOWED HOSTS
# -----------------------------
ALLOWED_HOSTS = ["*"]

# -----------------------------
# 🔄 CORS
# -----------------------------
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [
    "https://elpunto-frontend.vercel.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# -----------------------------
# 🧩 APPS
# -----------------------------
INSTALLED_APPS = [
    "jazzmin",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "modeltranslation",
    "rest_framework",
    "corsheaders",
    "task",
]

# -----------------------------
# ⚙️ MIDDLEWARE
# -----------------------------
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
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

# -----------------------------
# 🗄️ DATABASE
# -----------------------------
if os.environ.get("RENDER", "").lower() == "true" and os.environ.get("DATABASE_URL"):
    DATABASES = {
        "default": dj_database_url.config(conn_max_age=600)
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }

# -----------------------------
# 🌍 LANG
# -----------------------------
LANGUAGE_CODE = "es"
LANGUAGES = [("es", "Español"), ("en", "English")]
MODELTRANSLATION_FALLBACK_LANGUAGES = ("es",)
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# -----------------------------
# 🧱 STATIC & MEDIA
# -----------------------------
STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

# -----------------------------
# 🔐 AUTH
# -----------------------------
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# -----------------------------
# 🎨 JAZZMIN
# -----------------------------
JAZZMIN_SETTINGS = {
    "site_title": "El Punto Bar",
    "site_header": "Panel de Administración",
    "welcome_sign": "Bienvenido al panel de El Punto Bar",
    "site_brand": "El Punto Bar",
}

# -----------------------------
# 🔢 DEFAULT AUTO FIELD
# -----------------------------
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
