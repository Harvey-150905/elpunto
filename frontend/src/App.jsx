import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Reseñas from "./components/Reseñas";
import Contacto from "./components/Contacto"; // 👈 nuevo
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-[#0C0C0C] text-white font-[Poppins] overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      {/* <Reseñas /> */}
      <Contacto /> {/* 👈 nueva sección */}
      <Footer />
    </div>
  );
}

export default App;
