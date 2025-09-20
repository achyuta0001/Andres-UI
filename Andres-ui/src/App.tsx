import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <div className="andres-chat-container">
      <div className="andres-banner">ANDRES</div>

      <div className="andres-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className="andres-message">
            {msg}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="andres-input-area" onSubmit={handleSend}>
        <button type="button" className="plus-btn">
          ➕
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="andres-input"
        />
        <button type="submit" className="andres-send-btn">
          📩
        </button>
      </form>
    </div>
  );
}

export default App;
