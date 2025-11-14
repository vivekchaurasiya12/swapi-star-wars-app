import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";

const Layout = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      <header className="app-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 16px" }}>
        <h1>Star Wars Characters</h1>
        {isAuthenticated && (
          <button
            onClick={logout}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "none",
              background: "#f59e0b",
              color: "#071022",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            Logout
          </button>
        )}
      </header>

      <main>{children}</main>

      <footer className="app-footer">Made with ❤️ using SWAPI</footer>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
