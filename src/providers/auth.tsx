import { createContext, useState, useMemo, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ACCESS_TOKEN_KEY, API_KEY } from "@/utils/vars";
import { useUser } from "@/libs/auth";
import type { AuthTokens } from "@/types/api";
import type { User } from "@/types/models";

// type AuthUserContext = {
//   user: User | undefined;
//   setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
//   token: string | null;
//   apiKey: string | null;
//   setToken: (token: string | null, apiKey: string | null) => void;
//   logout: () => void;
//   isAuthenticated: boolean;
// };

type AuthUserContext = {
  user: User | null;
  accessToken: string | null;
  apiKey: string | null;
  authState: "loading" | "authenticated" | "unauthenticated";
  handleSetAuthTokens: (tokens: AuthTokens | null) => void;
  handleSaveAuthTokens: (tokens: AuthTokens | null) => void;
  handleSetUser: (user: User | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthUserContext | undefined>(
  undefined
);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [accessToken, setAccessToken] = useState<string | null>(null);

//   const handleSetAccessToken = (token: string | null) => {
//     setAccessToken(token);
//   };

//   const handleSetApiKey = (apiKey: string | null) => {
//     setApiKey(apiKey);
//   };

//   // Load token from localStorage on mount
//   useEffect(() => {
//     const savedToken = localStorage.getItem(TOKEN_KEY);
//     const savedApiKey = localStorage.getItem(API_KEY);
//     if (savedToken && savedApiKey) {
//       setTokenState(savedToken);
//       setApiKey(savedApiKey);
//     }
//   }, []);

//   const setToken = (newToken: string | null, apiKey: string | null) => {
//     if (newToken && apiKey) {
//       localStorage.setItem(TOKEN_KEY, newToken);
//       localStorage.setItem(API_KEY, apiKey);
//     } else {
//       localStorage.removeItem(TOKEN_KEY);
//       localStorage.removeItem(API_KEY);
//     }
//     setTokenState(newToken);
//   };

//   const logout = () => {
//     setUser(undefined);
//     setToken(null, null);
//   };

//   const authValues = useMemo(
//     () => ({
//       user,
//       setUser,
//       token,
//       apiKey,
//       setToken,
//       logout,
//       isAuthenticated: !!user && !!token,
//     }),
//     [user, token]
//   );

//   return (
//     <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
//   );
// };

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [authState, setAuthState] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  const { data, status } = useUser(accessToken);

  const handleSetAuthTokens = (tokens: AuthTokens | null) => {
    if (tokens) {
      setAccessToken(tokens.access_token);
      setApiKey(tokens.api_key);
    } else {
      setAccessToken(null);
      setApiKey(null);
    }
  };

  const handleSaveAuthTokens = (tokens: AuthTokens | null) => {
    if (tokens) {
      localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access_token);
      localStorage.setItem(API_KEY, tokens.api_key);
    } else {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(API_KEY);
    }
  };

  const handleSetUser = (user: User | null) => {
    setUser(user);
  };

  // hydrate the access token from local storage and refetch the user
  useEffect(() => {
    const savedAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const savedApiKey = localStorage.getItem(API_KEY);
    if (savedAccessToken && savedApiKey) {
      handleSetAuthTokens({
        access_token: savedAccessToken,
        api_key: savedApiKey,
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  }, []);

  // set auth state based on the status of the user query and tokens
  useEffect(() => {
    // No tokens → "unauthenticated"
    if (!accessToken || !apiKey) {
      setAuthState("unauthenticated");
    } else {
      // Tokens exist + query pending → "loading"
      if (status === "pending") {
        setAuthState("loading");
      } else if (status === "success") {
        // Tokens exist + query success with data → "authenticated"
        if (data) {
          setUser(data);
          setAuthState("authenticated");
          // Tokens exist + query success with no data → "unauthenticated"
        } else {
          setAuthState("unauthenticated");
        }
        // Tokens exist + query error → "unauthenticated"
      } else {
        setAuthState("unauthenticated");
      }
    }
  }, [status, accessToken, apiKey, data]);

  const logout = () => {
    setUser(null);
    handleSetAuthTokens(null);
  };

  const authValues = useMemo(
    () => ({
      user,
      accessToken,
      apiKey,
      authState,
      handleSetAuthTokens,
      handleSaveAuthTokens,
      handleSetUser,
      logout,
      isAuthenticated: !!user && !!accessToken && !!apiKey,
    }),
    [user, accessToken, apiKey, authState]
  );

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};
