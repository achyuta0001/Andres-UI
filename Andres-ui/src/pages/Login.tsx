import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/login.css";

type LoginProps = {
  onLogin: (username: string, password: string) => void;
};

function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username === "pjba" && password === "cicada") {
      onLogin(username, password); // update auth state
      navigate("/chat");
    } else {
      setError("Invalid username or password.");
    }
  };

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

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
