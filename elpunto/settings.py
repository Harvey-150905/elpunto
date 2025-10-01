"""
Django settings for elpunto project.

Configuración lista para PythonAnywhere:
- Usa SQLite (simple y persistente)
- Sirve archivos estáticos y media
- Compatible con Vercel (frontend)
"""

import os
from pathlib import Path
import pymysql
pymysql.install_as_MySQLdb()

BASE_DIR = Path(__file__).resolve().parent.parent

# -----------------------------
# 🔐 SECRET KEY
# -----------------------------
SECRET_KEY = os.environ.get(
    "SECRET_KEY", "django-insecure-8+r8y2dpr)9*x(*j(0tm_+mps4%z*mffa&_^2w5i_!38txzu$u"
)

# -----------------------------
# ⚙️ DEBUG MODE
# -----------------------------
DEBUG = os.environ.get("DEBUG", "False").lower() == "true"

# -----------------------------
# 🌐 HOSTS
# -----------------------------
ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    "axiomstudios.pythonanywhere.com",  # 👈 cámbialo por tu usuario real de PA
    "elpunto-frontend.vercel.app",
]

# -----------------------------
# 🤝 CORS CONFIG
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

    # 3rd-party
    "rest_framework",
    "corsheaders",

    # Local app
    "task",
]

# -----------------------------
# ⚙️ MIDDLEWARE
# -----------------------------
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "elpunto.urls"

# -----------------------------
# 🧱 TEMPLATES
# -----------------------------
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
# 🗄️ DATABASE (SQLite para PA)
# -----------------------------
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "AxiomStudios$default",  # 👈 tu nombre de base de datos exacto
        "USER": "AxiomStudios",          # 👈 tu usuario de PythonAnywhere
        "PASSWORD": "Alfredo1470x.",  # 👈 cámbiala por la tuya
        "HOST": "AxiomStudios.mysql.pythonanywhere-services.com",
        "PORT": "3306",
        "OPTIONS": {
            "charset": "utf8mb4",
            "init_command": "SET sql_mode='STRICT_TRANS_TABLES'",
        },
    }
}

# -----------------------------
# 🔑 AUTH
# -----------------------------
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# -----------------------------
# 🌍 I18N
# -----------------------------
LANGUAGE_CODE = "es"
LANGUAGES = [("es", "Español"), ("en", "English")]
MODELTRANSLATION_FALLBACK_LANGUAGES = ("es",)
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# -----------------------------
# 🧱 STATIC FILES
# -----------------------------
STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")

# -----------------------------
# 🖼️ MEDIA FILES
# -----------------------------
MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

# -----------------------------
# ⚙️ DRF
# -----------------------------
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.AllowAny"],
}

# -----------------------------
# 🎨 JAZZMIN
# -----------------------------
JAZZMIN_SETTINGS = {
    "site_title": "El Punto Bar",
    "site_header": "Panel de Administración",
    "welcome_sign": "Bienvenido al panel de El Punto Bar",
    "site_brand": "El Punto Bar",
    "show_sidebar": True,
    "navigation_expanded": True,
    "hide_apps": [],
    "hide_models": [],
}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
