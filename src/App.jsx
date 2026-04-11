import { useEffect, useState } from "react";
import "./App.css";
import { motion } from "framer-motion";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 секунды
  }, []);

  // Splash Screen
  if (loading) {
    return (
      <div style={styles.splash}>
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={styles.title}
        >
          🍔 MGO EATS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={styles.subtitle}
        >
          Добро пожаловать
        </motion.p>
      </div>
    );
  }

  // Основной сайт
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ padding: 20 }}
    >
      <h1>🍔 MGO EATS</h1>
      <p>Твой сайт здесь 👇</p>
    </motion.div>
  );
}

const styles = {
  splash: {
    height: "100vh",
    background: "#FFD700",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: "40px",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "18px",
    marginTop: "10px",
  },
};

export default App;