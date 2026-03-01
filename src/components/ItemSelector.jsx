import { useState } from "react";

export default function ItemSelector({ onDone }) {
  const initialList = ["Bed", "Sofa", "TV", "Fridge"];
  const [items, setItems] = useState(initialList.map(name => ({ name, qty: 0 })));

  const updateQty = (index, delta) => {
    setItems(prev => prev.map((item, i) => 
      i === index ? { ...item, qty: Math.max(0, item.qty + delta) } : item
    ));
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>Select Items</h3>
      
      <div style={styles.list}>
        {items.map((it, i) => (
          <div key={it.name} style={styles.row}>
            <span style={styles.itemName}>{it.name}</span>
            
            <div style={styles.counterGroup}>
              <button onClick={() => updateQty(i, -1)} style={styles.qtyBtn}>-</button>
              <span style={styles.qtyDisplay}>{it.qty}</span>
              <button onClick={() => updateQty(i, 1)} style={styles.qtyBtn}>+</button>
            </div>
          </div>
        ))}
      </div>

      <button 
        style={styles.confirmBtn}
        onClick={() => onDone(items.filter(i => i.qty > 0))}
      >
        Confirm Selection
      </button>
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    bottom: 20,
    right: 20,
    width: "280px",
    backgroundColor: "#1c1c1e",
    color: "#fff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    fontFamily: "system-ui, -apple-system, sans-serif",
    zIndex: 9999,
  },
  header: {
    margin: "0 0 15px 0",
    fontSize: "18px",
    fontWeight: "600",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "20px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid #333",
  },
  itemName: {
    fontSize: "15px",
    color: "#eee",
  },
  counterGroup: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "#2c2c2e",
    borderRadius: "8px",
    padding: "4px",
  },
  qtyBtn: {
    width: "28px",
    height: "28px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#3a3a3c",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyDisplay: {
    minWidth: "20px",
    textAlign: "center",
    fontWeight: "500",
  },
  confirmBtn: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#007aff",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s",
  }
};