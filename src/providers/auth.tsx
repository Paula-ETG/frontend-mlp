import type { User } from "@/types/api";
import { createContext, useState, useMemo, useEffect } from "react";

type AuthUserContext = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthUserContext | undefined>(
  undefined
);

const TOKEN_KEY = "auth_token";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setTokenState] = useState<string | null>(null);

  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (savedToken) {
      setTokenState(savedToken);
    }
  }, []);

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem(TOKEN_KEY, newToken);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
    setTokenState(newToken);
  };

  const logout = () => {
    setUser(undefined);
    setToken(null);
  };

  const authValues = useMemo(
    () => ({
      user,
      setUser,
      token,
      setToken,
      logout,
      isAuthenticated: !!user && !!token,
    }),
    [user, token]
  );

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};
