import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-30 bg-[#0C0C0C]/95 backdrop-blur-md border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-[#D4AF37]">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide">El Punto Bar</h1>

        {/* Links desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="/" className="hover:text-white transition">
            {t("navbar.home")}
          </a>
          <a href="/carta" className="hover:text-white transition">
            {t("navbar.menu")}
          </a>
          <a href="#contacto" className="hover:text-white transition">
            {t("navbar.contact")}
          </a>

          {/* Selector de idioma */}
          <div className="flex space-x-2 border-l border-[#D4AF37]/30 pl-4">
            <button
              onClick={() => changeLanguage("es")}
              className={`hover:text-white transition ${
                i18n.language === "es" ? "font-semibold text-white" : ""
              }`}
            >
              ES
            </button>
            <button
              onClick={() => changeLanguage("en")}
              className={`hover:text-white transition ${
                i18n.language === "en" ? "font-semibold text-white" : ""
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Botón menú móvil */}
        <button
          className="md:hidden text-[#D4AF37]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="md:hidden bg-[#0C0C0C] border-t border-[#D4AF37]/30 px-6 py-4 flex flex-col space-y-4 text-[#D4AF37]">
          <a href="/" className="hover:text-white" onClick={() => setMenuOpen(false)}>
            {t("navbar.home")}
          </a>
          <a href="/carta" className="hover:text-white" onClick={() => setMenuOpen(false)}>
            {t("navbar.menu")}
          </a>
          <button
            onClick={() => {
                const section = document.getElementById("contacto");
                if (section) {
                section.scrollIntoView({ behavior: "smooth" });
                setMenuOpen(false); // cerrar menú móvil si estaba abierto
                }
            }}
            className="hover:text-white transition"
            >
            {t("navbar.contact")}
          </button>
          <div className="flex space-x-4 pt-2 border-t border-[#D4AF37]/30">
            <button
              onClick={() => changeLanguage("es")}
              className={`hover:text-white ${
                i18n.language === "es" ? "font-semibold text-white" : ""
              }`}
            >
              ES
            </button>
            <button
              onClick={() => changeLanguage("en")}
              className={`hover:text-white ${
                i18n.language === "en" ? "font-semibold text-white" : ""
              }`}
            >
              EN
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
