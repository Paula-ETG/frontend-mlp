import { api } from "@/libs/axios";
import { type MutationConfig } from "@/libs/react-query";
import type { Session } from "@/types/api";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

export const createSessionInput = z.object({
  title: z.string(),
  summary: z.string(),
});

export type CreateSessionData = z.infer<typeof createSessionInput>;

export const createSessionApi = (data: CreateSessionData): Promise<Session> =>
  api.post("/session", data);

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
        queryKey: ["sessions"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
