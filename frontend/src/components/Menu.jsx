import { useEffect, useState } from "react";
import api from "../api";

function Menu() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Cargar categorías
    api.get("menu/categories/")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error cargando categorías:", err));

    // Cargar ítems del menú
    api.get("menu/items/")
      .then(res => setItems(res.data))
      .catch(err => console.error("Error cargando ítems:", err));
  }, []);

  // Relacionar ítems con su categoría
  const groupedItems = categories.map(cat => ({
    ...cat,
    items: items.filter(item => item.category === cat.id),
  }));

  return (
    <div>
      <h2>Menú del Restaurante</h2>
      {groupedItems.length === 0 && <p>Cargando menú...</p>}

      {groupedItems.map(cat => (
        <div key={cat.id} style={{ marginBottom: "2rem" }}>
          <h3>{cat.name}</h3>
          <ul>
            {cat.items.length > 0 ? (
              cat.items.map(item => (
                <li key={item.id}>
                  <strong>{item.name}</strong> — S/ {item.price}
                  <p>{item.description}</p>
                </li>
              ))
            ) : (
              <p>No hay platos en esta categoría.</p>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Menu;
