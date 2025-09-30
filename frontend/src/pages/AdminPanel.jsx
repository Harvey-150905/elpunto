import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api";

export default function AdminPanel() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null); // id del item en edición

  // Campos del formulario nuevo
  const [name, setName] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    api.get("menu/categories/").then((res) => setCategories(res.data));
    api.get("menu/items/").then((res) => setItems(res.data));
  }, []);

  // ---------------------
  // CREAR NUEVO PLATO
  // ---------------------
  const handleCreateItem = async (e) => {
    e.preventDefault();
    if (!categoryId || !name || !price) {
      alert("Por favor, completa los campos obligatorios.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("name_en", nameEn);
    formData.append("description", description);
    formData.append("description_en", descriptionEn);
    formData.append("price", price);
    formData.append("category", categoryId);
    formData.append("is_active", isActive);
    if (photo) formData.append("photo", photo);

    try {
      await api.post("menu/items/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Plato agregado correctamente");
      limpiarFormulario();
      api.get("menu/items/").then((res) => setItems(res.data));
    } catch (err) {
      console.error(err);
      alert("❌ Error al crear el plato.");
    }
  };

  // ---------------------
  // ELIMINAR PLATO
  // ---------------------
  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este plato?")) {
      await api.delete(`menu/items/${id}/`);
      setItems(items.filter((item) => item.id !== id));
    }
  };

  // ---------------------
  // EDITAR PLATO
  // ---------------------
  const handleEdit = (item) => {
    setEditingId(item.id);
    setName(item.name);
    setNameEn(item.name_en || "");
    setDescription(item.description || "");
    setDescriptionEn(item.description_en || "");
    setPrice(item.price);
    setCategoryId(item.category);
    setIsActive(item.is_active);
    setPhoto(null);
  };

  const handleSaveEdit = async (id) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("name_en", nameEn);
    formData.append("description", description);
    formData.append("description_en", descriptionEn);
    formData.append("price", price);
    formData.append("category", categoryId);
    formData.append("is_active", isActive);
    if (photo) formData.append("photo", photo);

    try {
      await api.patch(`menu/items/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Cambios guardados correctamente");
      setEditingId(null);
      limpiarFormulario();
      api.get("menu/items/").then((res) => setItems(res.data));
    } catch (err) {
      console.error(err);
      alert("❌ Error al guardar los cambios.");
    }
  };

  const limpiarFormulario = () => {
    setName("");
    setNameEn("");
    setDescription("");
    setDescriptionEn("");
    setPrice("");
    setPhoto(null);
    setCategoryId("");
    setIsActive(true);
  };

  const getImageUrl = (photoPath) => {
    if (!photoPath) return "";
    if (photoPath.startsWith("http")) return photoPath;
    return `${api.defaults.baseURL.replace(/\/$/, "")}/${photoPath.replace(
      /^\//,
      ""
    )}`;
  };

  // ---------------------
  // RENDER
  // ---------------------
  return (
    <div className="bg-[#0C0C0C] text-white min-h-screen font-[Poppins]">
      <Navbar />

      <section className="pt-24 pb-12 px-8">
        <h1 className="text-4xl font-bold text-[#D4AF37] mb-8 text-center">
          Panel de Administración 🍳
        </h1>

        {/* FORMULARIO NUEVO PLATO */}
        <form
          onSubmit={handleCreateItem}
          className="bg-[#111] p-6 rounded-xl shadow-lg max-w-4xl mx-auto mb-12"
        >
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-6">
            Agregar nuevo plato
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre (español)"
              className="bg-[#222] border border-[#D4AF37]/30 rounded-lg px-4 py-2 text-white"
            />
            <input
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              placeholder="Nombre (inglés)"
              className="bg-[#222] border border-[#D4AF37]/30 rounded-lg px-4 py-2 text-white"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción (español)"
              className="bg-[#222] border border-[#D4AF37]/30 rounded-lg px-4 py-2 text-white"
            />
            <textarea
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
              placeholder="Descripción (inglés)"
              className="bg-[#222] border border-[#D4AF37]/30 rounded-lg px-4 py-2 text-white"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Precio"
              type="number"
              step="0.01"
              className="bg-[#222] border border-[#D4AF37]/30 rounded-lg px-4 py-2 text-white"
            />

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
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
            <input
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="text-gray-400"
            />

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
              <span>Activo</span>
            </label>
          </div>

          <button
            type="submit"
            className="bg-[#D4AF37] text-black px-6 py-2 rounded-lg hover:bg-[#c6a233] transition"
          >
            Guardar
          </button>
        </form>

        {/* LISTADO DE PLATOS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-[#111] p-4 rounded-lg shadow-md relative"
            >
              {editingId === item.id ? (
                // ---------------------
                // FORMULARIO DE EDICIÓN
                // ---------------------
                <div className="space-y-3">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre (español)"
                    className="bg-[#222] border border-[#D4AF37]/30 rounded-lg px-3 py-1 text-white w-full"
                  />
                  <input
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    placeholder="Nombre (inglés)"
                    className="bg-[#222] border border-[#D4AF37]/30 rounded-lg px-3 py-1 text-white w-full"
                  />
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descripción (español)"
                    className="bg-[#222] border border-[#D4AF37]/30 rounded-lg px-3 py-1 text-white w-full"
                  />
                  <textarea
                    value={descriptionEn}
                    onChange={(e) => setDescriptionEn(e.target.value)}
                    placeholder="Descripción (inglés)"
                    className="bg-[#222] border border-[#D4AF37]/30 rounded-lg px-3 py-1 text-white w-full"
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Precio"
                    className="bg-[#222] border border-[#D4AF37]/30 rounded-lg px-3 py-1 text-white w-full"
                  />
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="bg-[#222] border border-[#D4AF37]/30 rounded-lg px-3 py-1 text-white w-full"
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
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                    />
                    <span>Activo</span>
                  </label>

                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => handleSaveEdit(item.id)}
                      className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded text-white"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-600 hover:bg-gray-700 px-4 py-1 rounded text-white"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                // ---------------------
                // VISTA NORMAL
                // ---------------------
                <>
                  {item.photo && (
                    <img
                      src={getImageUrl(item.photo)}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                  )}
                  <h3 className="text-lg font-bold text-white">{item.name}</h3>
                  <p className="text-gray-400">{item.description}</p>
                  {item.name_en && (
                    <p className="text-gray-500 italic">
                      EN: {item.name_en} — {item.description_en}
                    </p>
                  )}
                  <p className="text-[#D4AF37] font-semibold mt-2">
                    S/ {item.price}
                  </p>
                  <p className="text-sm mt-1">
                    Estado:{" "}
                    {item.is_active ? (
                      <span className="text-green-400">Activo</span>
                    ) : (
                      <span className="text-red-400">Inactivo</span>
                    )}
                  </p>

                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
