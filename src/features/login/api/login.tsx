import { api } from "@/libs/axios";
import { type MutationConfig } from "@/libs/react-query";
import type { Login } from "@/types/api";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

export const loginInput = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type LoginData = z.infer<typeof loginInput>;

export const loginApi = (data: FormData): Promise<Login> =>
  api.post("/auth/login", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

type UseLoginMutationConfig = {
  mutationConfig?: MutationConfig<typeof loginApi>;
};

export const useLogin = ({ mutationConfig }: UseLoginMutationConfig) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
