export default function Reseñas() {
  const reviews = [
    {
      name: "Pau Scalona",
      text: "DELICIOSO. El mejor ceviche y causa de Barcelona. Increíbles salsas, el pescado súper fresco y muy buena atención. Los precios muy razonables, vale la pena cada centavo.",
      stars: 5,
    },
    {
      name: "Josue A. Gonzales L.",
      text: "Es la primera vez que he venido al local y la verdad la atención super bien, he comido como he querido y lo que he querido jeje... Sin duda volveré. ¡Se los recomiendo! A seguir dejando en alto a nuestra gastronomía 🇵🇪👍🏻",
      stars: 5,
    },
    {
      name: "Ibai Zabaleta",
      text: "Auténtico restaurante de cocina peruana. Menú del día inigualable con excelente calidad-precio, platos típicos bien ejecutados y sabrosos. Trato amable y buen servicio.",
      stars: 4,
    },
  ];

  return (
    <section
      id="reseñas"
      className="scroll-mt-24 py-20 px-6 sm:px-12 bg-[#111] border-t border-[#D4AF37]/20"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#D4AF37] mb-10">
          Opiniones de nuestros clientes ⭐
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-[#0C0C0C] border border-[#D4AF37]/20 rounded-xl p-6 shadow-lg hover:shadow-[#D4AF37]/20 transition hover:-translate-y-1"
            >
              <p className="text-gray-300 italic mb-4 text-sm sm:text-base">
                “{r.text}”
              </p>

              <div className="flex justify-center mb-3 text-[#D4AF37] text-lg sm:text-xl">
                {"★".repeat(r.stars)}
                {"☆".repeat(5 - r.stars)}
              </div>

              <p className="text-[#D4AF37] font-semibold">{r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
