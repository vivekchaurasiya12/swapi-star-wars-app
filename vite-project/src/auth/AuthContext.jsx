import { createContext, useContext, useState, useEffect } from "react";
import { login as loginService, logout as logoutService, getToken, refreshToken } from "./authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Restore user from localStorage on mount
  useEffect(() => {
    const token = getToken();
    if (token) {
      // Restore user from localStorage
      const storedUser = localStorage.getItem('mock_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    setInitialized(true);
  }, []);

  // Silent token refresh every 5 minutes (mocked)
  useEffect(() => {
    const interval = setInterval(async () => {
      if (getToken()) {
        await refreshToken();
      }
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await loginService(credentials);
      setUser(res.user);
      setLoading(false);
      return res;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  const isAuthenticated = !!user || !!getToken();

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated, initialized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
