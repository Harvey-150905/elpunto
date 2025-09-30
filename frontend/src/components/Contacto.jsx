import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Contacto() {
  const { t } = useTranslation();
  const reviews = t("contact.reviews", { returnObjects: true });
  const [index, setIndex] = useState(-1); // -1 = mapa visible

  const handleNext = () => {
    if (index < reviews.length - 1) setIndex(index + 1);
    else setIndex(-1); // vuelve al mapa al final
  };

  const handlePrev = () => {
    setIndex(-1); // siempre vuelve al mapa
  };

  return (
    <section
      id="contacto"
      className="scroll-mt-24 py-20 px-6 sm:px-12 bg-[#0C0C0C] border-t border-[#D4AF37]/20"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* 📞 Columna Izquierda */}
        <div>
          <h2 className="text-4xl font-bold text-[#D4AF37] mb-6 text-center md:text-left">
            {t("contact.title")}
          </h2>

          <p className="text-gray-300 mb-8 text-center md:text-left">
            {t("contact.description")}
          </p>

          <div className="space-y-4 text-gray-200">
            <p>
              📍{" "}
              <span className="text-[#D4AF37] font-semibold">
                {t("contact.address_label")}
              </span>{" "}
              {t("contact.address")}
            </p>
            <p>
              ⏰{" "}
              <span className="text-[#D4AF37] font-semibold">
                {t("contact.hours_label")}
              </span>{" "}
              <br />
              {t("contact.hours_weekdays")} <br />
              {t("contact.hours_weekend")}
            </p>
            <p>
              📞{" "}
              <a
                href="tel:+34647037583"
                className="hover:text-[#D4AF37] transition"
              >
                +34 647 03 75 83
              </a>
            </p>
          </div>

          <div className="flex gap-4 mt-8 justify-center md:justify-start">
            <a
              href="tel:+34647037583"
              className="bg-[#D4AF37] text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#c6a233] transition"
            >
              {t("contact.call_button")}
            </a>
            <a
              href="https://wa.me/34647037583"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#1da851] transition"
            >
              {t("contact.whatsapp_button")}
            </a>
          </div>
        </div>

        {/* 🗺️ Columna Derecha: Mapa + Reseñas */}
        <div className="relative rounded-xl overflow-hidden shadow-lg border border-[#D4AF37]/20 h-[400px]">
          <div
            className="flex h-full w-full transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(${index === -1 ? "0%" : "-100%"})`,
            }}
          >
            {/* Mapa */}
            <div className="min-w-full h-full">
              <iframe
                title="Mapa de El Punto Bar"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.028177497581!2d2.1521803!3d41.3863252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a37751eb63dd%3A0x98127c25d9b67a13!2sEl%20Punto!5e0!3m2!1ses!2ses!4v1696013510873!5m2!1ses!2ses"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Reseñas */}
            <div className="min-w-full h-full flex items-center justify-center">
              {index >= 0 && (
                <div className="text-center px-6 max-w-md">
                  <p className="text-gray-300 italic mb-4">
                    “{reviews[index].text}”
                  </p>
                  <div className="text-[#D4AF37] text-xl mb-2">
                    {"★".repeat(reviews[index].stars)}
                    {"☆".repeat(5 - reviews[index].stars)}
                  </div>
                  <p className="text-[#D4AF37] font-semibold">
                    {reviews[index].name}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 🔘 Flechas */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 -translate-y-1/2 left-3 bg-black/50 p-2 rounded-full hover:bg-[#D4AF37]/40 transition"
          >
            <ChevronLeft className="text-[#D4AF37]" size={28} />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 -translate-y-1/2 right-3 bg-black/50 p-2 rounded-full hover:bg-[#D4AF37]/40 transition"
          >
            <ChevronRight className="text-[#D4AF37]" size={28} />
          </button>
        </div>
      </div>
    </section>
  );
}
