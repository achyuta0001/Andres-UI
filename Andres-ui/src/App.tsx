import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authData, setAuthData] = useState<{
    username: string;
    password: string;
  } | null>(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route
          path="/login"
          element={
            <Login
              onLogin={(username: string, password: string) => {
                setIsAuthenticated(true);
                setAuthData({ username, password });
              }}
            />
          }
        />

        <Route
          path="/chat"
          element={
            isAuthenticated && authData ? (
              <Chat username={authData.username} password={authData.password} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
