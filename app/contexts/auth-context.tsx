"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  userName: string;
  login: (userData: { isAdmin: boolean; userName: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check authentication state from localStorage on mount
    const authData = localStorage.getItem("authData");
    if (authData) {
      const { isLoggedIn, isAdmin, userName } = JSON.parse(authData);
      setIsLoggedIn(isLoggedIn);
      setIsAdmin(isAdmin);
      setUserName(userName);
    }
  }, []);

  const login = (userData: { isAdmin: boolean; userName: string }) => {
    setIsLoggedIn(true);
    setIsAdmin(userData.isAdmin);
    setUserName(userData.userName);
    
    // Save auth state to localStorage
    localStorage.setItem(
      "authData",
      JSON.stringify({
        isLoggedIn: true,
        isAdmin: userData.isAdmin,
        userName: userData.userName,
      })
    );
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserName("");
    localStorage.removeItem("authData");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAdmin,
        userName,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 