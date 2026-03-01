import { useState, useEffect, useRef } from "react";
import ItemSelector from "./ItemSelector";

export default function AIChat() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([
    { user: false, text: "Hi 👋 Welcome to Tithi Packers & Movers. How can I help you?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const userId = "tushar123";
  const chatEndRef = useRef(null);
  const [showItems, setShowItems] = useState(false);
  function sendManual(message) {
  fetch(`http://localhost:5000/api/aiBooking/chat/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });
}

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, isTyping]);
  


  function typeBotMessage(text) {
    let index = 0;
    let botMsg = "";
    
    // Typing effect start hone se pehle loader hatane ke liye isTyping false
    setIsTyping(false); 

    const interval = setInterval(() => {
      botMsg += text[index];
      index++;

      setChat(prev => {
        let newChat = [...prev];
        newChat[newChat.length - 1].text = botMsg;
        return newChat;
      });

      if (index >= text.length) clearInterval(interval);
    }, 20);
  }

  async function send() {
    if (!msg.trim()) return;

    const userMsg = msg;
    setMsg("");

    setChat(prev => [...prev, { user: true, text: userMsg }]);
    
    // API call se pehle loading state
    setIsTyping(true);

    try {
      let res = await fetch(`http://localhost:5000/api/aiBooking/chat/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg })
      });

      let data = await res.json();
      if (data.reply.toLowerCase().includes("select items")) {
  setShowItems(true);
}
      // Pehle khali bot bubble add karein, fir typing start karein
      setChat(prev => [...prev, { user: false, text: "" }]);
      typeBotMessage(data.reply);

    } catch (err) {
      setIsTyping(false);
      setChat(prev => [...prev, { user: false, text: "Server error. Try again later." }]);
    }
  }

  return (
    <div style={styles.chatContainer}>
      {/* Messages Window */}
      <div style={styles.chatBody}>
        {chat.map((c, i) => (
          <div
            key={i}
            style={{
              ...styles.msg,
              alignSelf: c.user ? "flex-end" : "flex-start",
              background: c.user ? "linear-gradient(135deg, #25D366, #128C7E)" : "#262d31",
              borderRadius: c.user ? "15px 15px 2px 15px" : "15px 15px 15px 2px",
              color: "#fff",
            }}
          >
            {c.text}
          </div>
        ))}
        
        {/* Real Dynamic Typing Dots */}
        {isTyping && (
          <div style={{ ...styles.msg, alignSelf: "flex-start", background: "#262d31" }}>
            <div className="dot-flashing"></div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

{showItems && (
  <ItemSelector
    onDone={(items) => {
      console.log("Items Selected:", items);

      fetch(`http://localhost:5000/api/aiBooking/items/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items })
      });

      setShowItems(false);
      setChat(prev => [...prev, { user: true, text: "Selected items sent ✅" }]);

      sendManual("items_done");
    }}
  />
)}



      {/* Modern Input Bar */}
      <div style={styles.inputArea}>
        <div style={styles.inputWrapper}>
          <input
            value={msg}
            onChange={e => setMsg(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Type message..."
            style={styles.input}
          />
          <button onClick={send} style={styles.sendIconBtn}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        .dot-flashing {
          position: relative; width: 6px; height: 6px; border-radius: 5px;
          background-color: #25D366; color: #25D366;
          animation: dot-flashing 1s infinite linear alternate;
          animation-delay: .5s; margin: 5px 10px;
        }
        .dot-flashing::before, .dot-flashing::after {
          content: ''; display: inline-block; position: absolute; top: 0;
          width: 6px; height: 6px; border-radius: 5px; background-color: #25D366;
          animation: dot-flashing 1s infinite linear alternate;
        }
        .dot-flashing::before { left: -12px; animation-delay: 0s; }
        .dot-flashing::after { left: 12px; animation-delay: 1s; }
        @keyframes dot-flashing {
          0% { background-color: #25D366; }
          50%, 100% { background-color: rgba(37, 211, 102, 0.2); }
        }
        div::-webkit-scrollbar { width: 4px; }
        div::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
      `}</style>
    </div>
  );
  

}

const styles = {
  chatContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "#0b141a",
    overflow: "hidden"
  },
  chatBody: {
    flex: 1,
    padding: "15px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    background: "url('https://w0.peakpx.com/wallpaper/580/1/HD-wallpaper-whatsapp-dark-backround-whatsapp-patterns-dark-green.jpg')",
    backgroundSize: "cover"
  },
  msg: {
    padding: "10px 14px",
    maxWidth: "80%",
    fontSize: "14px",
    lineHeight: "1.5",
    boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
    wordBreak: "break-word"
  },
  inputArea: {
    padding: "10px 15px",
    background: "#1e2428",
    display: "flex",
    alignItems: "center"
  },
  inputWrapper: {
    display: "flex",
    flex: 1,
    background: "#33383b",
    borderRadius: "25px",
    padding: "2px 12px",
    alignItems: "center"
  },
  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    padding: "10px",
    color: "#fff",
    outline: "none",
    fontSize: "14px"
  },
  sendIconBtn: {
    background: "transparent",
    border: "none",
    color: "#25D366",
    cursor: "pointer",
    padding: "5px",
    display: "flex",
    alignItems: "center"
  }
  
};