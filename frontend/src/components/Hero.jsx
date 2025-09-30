import { Parallax } from "react-parallax";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <Parallax
      bgImage="https://lh3.googleusercontent.com/p/AF1QipMiEd-IP9PpqKM0x9ktLpRsao_PE9b6-_S_j6eA=s1360-w1360-h1020-rw"
      strength={300}
    >
      <div className="h-screen flex items-center justify-center bg-black/60 text-center">
        <div className="z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-[#D4AF37] mb-6 drop-shadow-lg">
            {t("hero.title")}
          </h1>
          <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>
          <a
            href="/carta"
            className="bg-[#D4AF37] text-black font-semibold px-6 py-3 rounded-lg hover:bg-[#e8c14c] transition"
          >
            {t("hero.button")}
          </a>
        </div>
      </div>
    </Parallax>
  );
}
