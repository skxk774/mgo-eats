import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [animItem, setAnimItem] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const menu = [
    {
      name: "Бургер Цезарь",
      price: 380,
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
    },
    {
      name: "Пицца Пепперони",
      price: 600,
      img: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Supreme_pizza.jpg"
    },
    {
      name: "Coca-Cola 0.5L",
      price: 100,
      img: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13"
    },
    {
      name: "Pepsi 1L",
      price: 120,
      img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97"
    }
  ];

  const addToCart = (item) => {
    setAnimItem(item.name);

    setTimeout(() => {
      setAnimItem(null);
    }, 300);

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
    })
      .then(res => res.json())
      .then(() => {
        alert("Заказ отправлен!");
        setCart([]);
        setShowForm(false);
        setName("");
        setPhone("");
        setAddress("");
      });
  };

  return (
    <div style={{ paddingBottom: "120px", background: "#FFF8E1", minHeight: "100vh" }}>
      
      <h1 style={{ textAlign: "center" }}>🍔 MGO Eats</h1>

      {/* МЕНЮ */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "15px",
        padding: "10px"
      }}>
        {menu.map((item, i) => {
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
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "10px"
                }}>
                  <button onClick={() => decrease(item.name)}>➖</button>
                  <span>{cartItem.quantity}</span>
                  <button onClick={() => increase(item.name)}>➕</button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* КОРЗИНА СНИЗУ */}
      {cart.length > 0 && (
        <div style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#fff",
          padding: "15px",
          boxShadow: "0 -3px 10px rgba(0,0,0,0.2)",
          transform: animItem ? "scale(1.05)" : "scale(1)",
          transition: "0.2s"
        }}>
          <h3>🛒 {cart.length} товаров | {totalPrice} сом</h3>

          {!showForm && (
            <button onClick={() => setShowForm(true)} style={{
              width: "100%",
              padding: "12px",
              background: "#00C853",
              color: "#fff",
              border: "none",
              borderRadius: "10px"
            }}>
              Оформить заказ
            </button>
          )}

          {showForm && (
            <div>
              <input placeholder="Имя" value={name} onChange={e => setName(e.target.value)} />
              <input placeholder="Телефон" value={phone} onChange={e => setPhone(e.target.value)} />
              <input placeholder="Адрес" value={address} onChange={e => setAddress(e.target.value)} />

              <button onClick={sendOrder} style={{
                width: "100%",
                marginTop: "10px",
                padding: "12px",
                background: "#2962FF",
                color: "#fff",
                border: "none",
                borderRadius: "10px"
              }}>
                Подтвердить
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;