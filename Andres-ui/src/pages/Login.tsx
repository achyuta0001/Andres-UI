import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Login.css";

type LoginProps = {
  onLogin: (value: boolean) => void;
};

function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // ✅ Hardcoded check for now
    if (username === "admin" && password === "admin") {
      onLogin(true); // update auth state in App
      navigate("/chat"); // go to Chat page (match your route in App.tsx)
    } else {
      setError("Invalid username or password.");
    }
  };

  //   const handlePlusClick = () => {
  //     alert("Plus button clicked!");
  //   };

  return (
    <div className="login-container">
      <div className="login-banner">LOGIN</div>

      <form className="login-form" onSubmit={handleLogin}>
        {error && <div className="login-error">{error}</div>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        <div className="login-buttons">
          <button type="submit" className="login-btn">
            Login
          </button>
          {/* <button
            type="button"
            className="login-plus-btn"
            onClick={handlePlusClick}
          >
            ➕
          </button> */}
        </div>
      </form>
    </div>
  );
}

export default Login;
