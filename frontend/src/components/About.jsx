import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <section
      id="sobre-nosotros"
      className="flex flex-col md:flex-row items-center justify-center py-20 px-10 bg-[#111]"
    >
      <img
        src="https://lh3.googleusercontent.com/p/AF1QipOi2tvw_XO3kB9J8-SPGl1EkVp7YQZ_LLOLgCJ0=w141-h118-n-k-no-nu"
        alt="Restaurante"
        className="rounded-lg shadow-lg w-full md:w-1/2 mb-10 md:mb-0 md:mr-10"
      />

      <div className="text-gray-300 md:w-1/2">
        <h2 className="text-4xl font-bold text-[#D4AF37] mb-4">
          {t("about.title")}
        </h2>
        <p className="mb-4">
          {t("about.paragraph1")}
        </p>
        <p>{t("about.paragraph2")}</p>
      </div>
    </section>
  );
}
