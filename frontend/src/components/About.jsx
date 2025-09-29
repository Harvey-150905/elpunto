export default function About() {
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
        <h2 className="text-4xl font-bold text-[#D4AF37] mb-4">Sobre Nosotros</h2>
        <p className="mb-4">
          En <strong>El Punto Bar Restaurante</strong> celebramos la auténtica
          cocina peruana con un toque moderno. Nos apasiona ofrecer experiencias
          gastronómicas inolvidables en un ambiente acogedor y sofisticado.
        </p>
        <p>
          Ya sea para disfrutar con amigos, en pareja o familia, te esperamos con
          los mejores sabores del Perú y una atención de primera.
        </p>
      </div>
    </section>
  );
}
