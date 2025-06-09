import { useQuery } from "@tanstack/react-query";
import { api } from "./axios";
import type { User } from "@/types/api";
import { useAuth } from "@/hooks/use-user";
import { useEffect } from "react";

const verifyUserAuth = (): Promise<User> => {
  return api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
    },
  });
};

export const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: verifyUserAuth,
  });

export const AuthLoader = () => {
  const { data } = useUser();
  const authUser = useAuth();

  useEffect(() => {
    authUser.setUser(data);
  }, [data, authUser]);

  return undefined;
};
