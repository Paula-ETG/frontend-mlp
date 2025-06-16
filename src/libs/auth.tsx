import { useQuery } from "@tanstack/react-query";
import { api } from "./axios";
import type { User } from "@/types/api";
// import { useAuth } from "@/hooks/use-user";
// import { useEffect } from "react";

const verifyUserAuth = (token: string): Promise<User> => {
  return api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useUser = (token: string | null) =>
  useQuery({
    queryKey: ["user", token],
    queryFn: () => verifyUserAuth(token!),
    enabled: !!token,
  });

// export const AuthLoader = () => {
//   const authUser = useAuth();
//   const { data, error } = useUser(authUser.token);

//   useEffect(() => {
//     if (data) {
//       authUser.setUser(data);
//     } else if (error) {
//       // If token is invalid, clear it
//       authUser.logout();
//     }
//   }, [data, error, authUser]);

//   return null;
// };
