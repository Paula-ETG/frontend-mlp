import { api } from "@/libs/axios";
import { type MutationConfig } from "@/libs/react-query";
import type { Session } from "@/types/api";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

export const createSessionInput = z.object({
  title: z.string(),
  summary: z.string(),
});

export type CreateSessionData = z.infer<typeof createSessionInput> & {
  assistant_id: string;
  account_id: string;
};

export const createSessionApi = (data: CreateSessionData): Promise<Session> =>
  api.post("/session", data, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
    },
  });

type UseCreateSessionMutationConfig = {
  mutationConfig?: MutationConfig<typeof createSessionApi>;
};

export const useCreateSession = ({
  mutationConfig,
}: UseCreateSessionMutationConfig) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: createSessionApi,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
