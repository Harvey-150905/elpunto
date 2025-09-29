export default function Footer() {
  return (
    <footer className="bg-[#0C0C0C] text-gray-400 text-center py-6">
      <p>© 2025 El Punto Bar Restaurante Peruano — Todos los derechos reservados</p>
      <div className="flex justify-center space-x-6 mt-3">
        <a href="https://www.instagram.com/elpuntobarrestauranteperuano/" target="_blank" className="hover:text-[#D4AF37]">Instagram</a>
        <a href="https://www.tiktok.com/@elpuntorestauranteperu" target="_blank" className="hover:text-[#D4AF37]">Tik Tok</a>
        <a href="https://wa.me/34647037583" target="_blank" className="hover:text-[#D4AF37]">WhatsApp</a>
      </div>
    </footer>
  );
}
