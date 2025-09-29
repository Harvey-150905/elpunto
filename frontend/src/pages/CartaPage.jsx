import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api";

export default function CartaPage() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    api
      .get("menu/categories/", {
        headers: { "Accept-Language": i18n.language },
      })
      .then((res) => setCategories(res.data));

    api
      .get("menu/items/", {
        headers: { "Accept-Language": i18n.language },
      })
      .then((res) => setItems(res.data));
  }, [i18n.language]);

  const grouped = categories.map((cat) => ({
    ...cat,
    items: items.filter((i) => i.category === cat.id),
  }));

  const filtered = grouped.map((cat) => ({
    ...cat,
    items: cat.items.filter((i) =>
      (i.name || "").toLowerCase().includes(search.toLowerCase())
    ),
  }));

  return (
    <div className="bg-[#0C0C0C] min-h-screen text-white font-[Poppins]">
      <Navbar />

      {/* Subnavbar de categorías */}
      <div className="sticky top-16 bg-[#0C0C0C]/95 backdrop-blur-md z-20 border-b border-[#D4AF37]/20 overflow-x-auto">
        <div className="flex space-x-6 px-6 py-3 text-[#D4AF37]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                document
                  .getElementById(`cat-${cat.id}`)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="whitespace-nowrap text-sm sm:text-base font-medium hover:text-white transition-colors"
            >
              {/* Mostrar nombre traducido */}
              {i18n.language === "en" ? cat.name_en || cat.name : cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sección principal */}
      <section className="pt-28 pb-16 px-6 sm:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#D4AF37] text-center mb-10">
          {t("carta.title")}
        </h1>

        {/* Buscador (solo visible en móvil) */}
        <div className="flex justify-center mb-10 sm:hidden">
          <input
            type="text"
            placeholder={t("carta.search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-11/12 bg-[#111] border border-[#D4AF37]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Render de categorías e ítems */}
        {filtered.map((cat) =>
          cat.items.length > 0 ? (
            <div key={cat.id} id={`cat-${cat.id}`} className="mb-12 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#D4AF37] mb-4 border-b border-[#D4AF37]/60 inline-block">
                {i18n.language === "en" ? cat.name_en || cat.name : cat.name}
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#111] p-6 rounded-xl shadow-md hover:shadow-[#D4AF37]/40 transition hover:-translate-y-1"
                  >
                    {item.photo && (
                      <img
                        src={
                          item.photo.startsWith("http")
                            ? item.photo
                            : `${api.defaults.baseURL}${item.photo}`
                        }
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-lg mb-4 border border-[#D4AF37]/20"
                      />
                    )}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                      {i18n.language === "en"
                        ? item.name_en || item.name
                        : item.name}
                    </h3>
                    <p className="text-gray-400 mb-2">
                      {i18n.language === "en"
                        ? item.description_en || item.description
                        : item.description}
                    </p>
                    <p className="text-[#D4AF37] font-semibold text-lg">
                      {t("carta.price")} {item.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )}
      </section>

      <Footer />
    </div>
  );
}
