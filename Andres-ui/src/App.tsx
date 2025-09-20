import { useState, useRef, useEffect } from "react";
import "./App.css";

type ChatMessage = {
  text: string;
  sender: "me" | "server";
};

function App() {
  const [userMessages, setUserMessages] = useState<ChatMessage[]>([]);
  const [serverMessages, setServerMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom whenever a message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [userMessages, serverMessages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMsg: ChatMessage = { text: input, sender: "me" };
    setUserMessages((prev) => [...prev, userMsg]);

    try {
      const response = await fetch(
        `http://localhost:8080/chat?q=${encodeURIComponent(input)}`,
        { method: "GET", headers: { "Content-Type": "text/plain" } }
      );
      const serverReply = await response.text();

      // Add server reply
      const serverMsg: ChatMessage = { text: serverReply, sender: "server" };
      setServerMessages((prev) => [...prev, serverMsg]);
    } catch (error) {
      console.error("Error sending message:", error);
      setServerMessages((prev) => [
        ...prev,
        { text: "⚠️ Error connecting to server", sender: "server" },
      ]);
    }

    setInput("");
  };

  // Clear messages handler for plus button
  const handlePlusClick = async () => {
    try {
      // Clear backend chat history
      await fetch("http://localhost:8080/chat/clearHistory", { method: "GET" });

      // Clear frontend messages
      setUserMessages([]);
      setServerMessages([]);
      setInput("");
    } catch (error) {
      console.error("Error clearing messages:", error);
      setServerMessages((prev) => [
        ...prev,
        { text: "⚠️ Error clearing messages", sender: "server" },
      ]);
    }
  };

  // Merge user and server messages for display
  const mergedMessages: ChatMessage[] = [];
  const maxLength = Math.max(userMessages.length, serverMessages.length);
  for (let i = 0; i < maxLength; i++) {
    if (userMessages[i]) mergedMessages.push(userMessages[i]);
    if (serverMessages[i]) mergedMessages.push(serverMessages[i]);
  }

  return (
    <div className="andres-chat-container">
      <div className="andres-banner">ANDRES</div>

      <div className="andres-messages">
        {mergedMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`andres-message ${
              msg.sender === "me" ? "me" : "server"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="andres-input-area" onSubmit={handleSend}>
        <button
          type="button"
          className="plus-btn"
          onClick={handlePlusClick} // clears frontend & backend messages
        >
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
