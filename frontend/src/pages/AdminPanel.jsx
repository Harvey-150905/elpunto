import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api";

export default function AdminPanel() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  // Obtener categorías e ítems existentes
  useEffect(() => {
    api.get("menu/categories/").then((res) => setCategories(res.data));
    api.get("menu/items/").then((res) => setItems(res.data));
  }, []);

  // Crear un nuevo plato
  const handleCreateItem = async (e) => {
    e.preventDefault();
    if (!categoryId || !name || !price) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", categoryId);
    if (photo) formData.append("photo", photo);

    try {
      await api.post("menu/items/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Plato agregado correctamente");
      setName("");
      setPrice("");
      setDescription("");
      setPhoto(null);
      setCategoryId("");
      api.get("menu/items/").then((res) => setItems(res.data));
    } catch (err) {
      alert("❌ Error al crear el plato. Revisa los datos.");
    }
  };

  // Eliminar un plato
  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este plato?")) {
      await api.delete(`menu/items/${id}/`);
      setItems(items.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="bg-[#0C0C0C] text-white min-h-screen font-[Poppins]">
      <Navbar />

      <section className="pt-24 pb-12 px-8">
        <h1 className="text-4xl font-bold text-[#D4AF37] mb-8 text-center">
          Panel de Administración 🍳
        </h1>

        {/* Formulario para crear nuevo plato */}
        <form
          onSubmit={handleCreateItem}
          className="bg-[#111] p-6 rounded-xl shadow-lg max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">
            Agregar nuevo plato
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre del plato"
              className="bg-[#222] border border-[#D4AF37]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
            />
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Precio"
              type="number"
              step="0.01"
              className="bg-[#222] border border-[#D4AF37]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción"
            className="w-full bg-[#222] border border-[#D4AF37]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37] mb-4"
          />

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="bg-[#222] border border-[#D4AF37]/30 rounded-lg px-4 py-2 text-white"
            >
              <option value="">Seleccionar categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="text-gray-400"
            />
          </div>

          <button
            type="submit"
            className="bg-[#D4AF37] text-black px-6 py-2 rounded-lg hover:bg-[#c6a233] transition"
          >
            Guardar
          </button>
        </form>

        {/* Listado de productos */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-[#111] p-4 rounded-lg shadow-md relative"
            >
              {item.photo && (
                <img
                  src={`${api.defaults.baseURL}${item.photo}`}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h3 className="text-lg font-bold text-white">{item.name}</h3>
              <p className="text-gray-400">{item.description}</p>
              <p className="text-[#D4AF37] font-semibold">S/ {item.price}</p>

              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
