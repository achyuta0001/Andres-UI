import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Chat from "./pages/Chat";
import Login from "./pages/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Redirect root `/` to `/login` */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login route — pass down setIsAuthenticated */}
        <Route path="/login" element={<Login onLogin={setIsAuthenticated} />} />

        {/* Protected Chat route */}
        <Route
          path="/chat"
          element={
            isAuthenticated ? <Chat /> : <Navigate to="/login" replace />
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
