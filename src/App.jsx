import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function App() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [animItem, setAnimItem] = useState(null);
  const [category, setCategory] = useState("Все");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const menu = [
    { name: "Бургер Цезарь", price: 380, category: "Бургеры", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },
    { name: "Пицца Пепперони", price: 600, category: "Бургеры", img: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Supreme_pizza.jpg" },
    { name: "Шаурма", price: 250, category: "Бургеры", img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092" },
    { name: "Суши Филадельфия", price: 450, category: "Суши", img: "https://images.unsplash.com/photo-1553621042-f6e147245754" },
    { name: "Суши Калифорния", price: 420, category: "Суши", img: "https://images.unsplash.com/photo-1562158070-622a6c5c5c5d" },
    { name: "Сет роллов", price: 900, category: "Суши", img: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56" },
    { name: "Coca-Cola 0.5L", price: 100, category: "Напитки", img: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13" },
    { name: "Pepsi 1L", price: 120, category: "Напитки", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97" },
    { name: "Милкшейк", price: 180, category: "Напитки", img: "https://images.unsplash.com/photo-1577805947697-89e18249d767" },
    { name: "Чизкейк", price: 200, category: "Десерты", img: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40" }
  ];

  const categories = ["Все", "Бургеры", "Суши", "Напитки", "Десерты"];

  const filteredMenu = category === "Все"
    ? menu
    : menu.filter(item => item.category === category);

  const addToCart = (item) => {
    setAnimItem(item.name);
    setTimeout(() => setAnimItem(null), 300);

    const existing = cart.find(i => i.name === item.name);
    if (existing) {
      setCart(cart.map(i =>
        i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const increase = (name) => {
    setCart(cart.map(i => i.name === name ? { ...i, quantity: i.quantity + 1 } : i));
  };

  const decrease = (name) => {
    setCart(
      cart
        .map(i => i.name === name ? { ...i, quantity: i.quantity - 1 } : i)
        .filter(i => i.quantity > 0)
    );
  };

  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const sendOrder = () => {
    fetch("http://localhost:5000/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart, name, phone, address })
    }).then(() => {
      alert("Заказ отправлен!");
      setCart([]);
      setShowForm(false);
    });
  };

  if (loading) {
    return (
      <div style={{
        height: "100vh",
        background: "#FFD700",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <motion.h1 initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
          🍔 MGO EATS
        </motion.h1>
        <p>Добро пожаловать</p>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: "120px", background: "#FFF8E1", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center" }}>🍔 MGO Eats</h1>

      {/* КАТЕГОРИИ */}
      <div style={{
        display: "flex",
        gap: "10px",
        overflowX: "auto",
        padding: "10px"
      }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} style={{
            padding: "8px 12px",
            borderRadius: "20px",
            border: "none",
            background: category === cat ? "#FF6F00" : "#eee"
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* МЕНЮ */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "15px",
        padding: "10px"
      }}>
        {filteredMenu.map((item, i) => {
          const cartItem = cart.find(ci => ci.name === item.name);

          return (
            <div key={i} style={{
              background: "#fff",
              borderRadius: "15px",
              padding: "10px",
              boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
              transform: animItem === item.name ? "scale(0.9)" : "scale(1)",
              transition: "0.3s"
            }}>
              <img src={item.img} style={{
                width: "100%",
                height: "120px",
                objectFit: "cover",
                borderRadius: "10px"
              }} />

              <h4>{item.name}</h4>
              <p>{item.price} сом</p>

              {!cartItem ? (
                <button onClick={() => addToCart(item)} style={{
                  width: "100%",
                  padding: "8px",
                  background: "#FF6F00",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px"
                }}>
                  Добавить
                </button>
              ) : (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <button onClick={() => decrease(item.name)}>➖</button>
                  <span>{cartItem.quantity}</span>
                  <button onClick={() => increase(item.name)}>➕</button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* КОРЗИНА */}
      {cart.length > 0 && (
        <div style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#fff",
          padding: "15px"
        }}>
          <h3>🛒 {cart.length} | {totalPrice} сом</h3>

          {!showForm && (
            <button onClick={() => setShowForm(true)}>Оформить заказ</button>
          )}

          {showForm && (
            <div>
              <input placeholder="Имя" value={name} onChange={e => setName(e.target.value)} />
              <input placeholder="Телефон" value={phone} onChange={e => setPhone(e.target.value)} />
              <input placeholder="Адрес" value={address} onChange={e => setAddress(e.target.value)} />
              <button onClick={sendOrder}>Подтвердить</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;