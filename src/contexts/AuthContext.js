import React, { createContext, useState, useContext, useEffect } from 'react';
import { login, register, logout } from '../services/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (e.g., by verifying JWT in localStorage)
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and set user
      // This is a placeholder and should be implemented with your backend
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const authLogin = async (email, password) => {
    const result = await login(email, password);
    if (result.success) {
      setUser(result.user);
      localStorage.setItem('token', result.token);
    }
    return result;
  };

  const authRegister = async (userData) => {
    const result = await register(userData);
    if (result.success) {
      setUser(result.user);
      localStorage.setItem('token', result.token);
    }
    return result;
  };

  const authLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    logout();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login: authLogin, register: authRegister, logout: authLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}