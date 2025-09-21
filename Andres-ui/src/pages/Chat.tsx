import { useState, useRef, useEffect } from "react";
import "./../styles/chat.css";

type ChatProps = {
  username: string;
  password: string;
};

type ChatMessage = {
  text: string;
  sender: "me" | "server";
};

function Chat({ username, password }: ChatProps) {
  const [userMessages, setUserMessages] = useState<ChatMessage[]>([]);
  const [serverMessages, setServerMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [userMessages, serverMessages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = { text: input, sender: "me" };
    setUserMessages((prev) => [...prev, userMsg]);

    try {
      const response = await fetch(
        `http://localhost:8080/chat?q=${encodeURIComponent(input)}`,
        {
          method: "GET",
          headers: {
            Authorization: "Basic " + btoa(`${username}:${password}`),
          },
        }
      );
      const serverReply = await response.text();

      const serverMsg: ChatMessage = { text: serverReply, sender: "server" };
      setServerMessages((prev) => [...prev, serverMsg]);
    } catch (error) {
      console.error(error);
      setServerMessages((prev) => [
        ...prev,
        { text: "⚠️ Error connecting to server", sender: "server" },
      ]);
    }

    setInput("");
  };

  const handlePlusClick = async () => {
    try {
      await fetch("http://localhost:8080/chat/clearHistory", {
        method: "GET",
        headers: { Authorization: "Basic " + btoa(`${username}:${password}`) },
      });

      setUserMessages([]);
      setServerMessages([]);
      setInput("");
    } catch (error) {
      console.error(error);
      setServerMessages((prev) => [
        ...prev,
        { text: "⚠️ Error clearing messages", sender: "server" },
      ]);
    }
  };

  const mergedMessages: ChatMessage[] = [];
  const maxLength = Math.max(userMessages.length, serverMessages.length);
  for (let i = 0; i < maxLength; i++) {
    if (userMessages[i]) mergedMessages.push(userMessages[i]);
    if (serverMessages[i]) mergedMessages.push(serverMessages[i]);
  }

  return (
    <div className="chat-container">
      <div className="chat-banner">ANDRES</div>
      <div className="chat-messages">
        {mergedMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.sender === "me" ? "me" : "server"}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-area" onSubmit={handleSend}>
        <button type="button" className="plus-btn" onClick={handlePlusClick}>
          ➕
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button type="submit" className="send-btn">
          📩
        </button>
      </form>
    </div>
  );
}

export default Chat;
