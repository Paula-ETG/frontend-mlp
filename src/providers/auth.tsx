import type { User } from "@/types/api";
import { createContext, useState, useMemo, useEffect } from "react";

type AuthUserContext = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  token: string | null;
  apiKey: string | null;
  setToken: (token: string | null, apiKey: string | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthUserContext | undefined>(
  undefined
);

const TOKEN_KEY = "journey_ai_access_token";
const API_KEY = "journey_ai_api_key";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setTokenState] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    const savedApiKey = localStorage.getItem(API_KEY);
    if (savedToken && savedApiKey) {
      setTokenState(savedToken);
      setApiKey(savedApiKey);
    }
  }, []);

  const setToken = (newToken: string | null, apiKey: string | null) => {
    if (newToken && apiKey) {
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(API_KEY, apiKey);
    } else {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(API_KEY);
    }
    setTokenState(newToken);
  };

  const logout = () => {
    setUser(undefined);
    setToken(null, null);
  };

  const authValues = useMemo(
    () => ({
      user,
      setUser,
      token,
      apiKey,
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
