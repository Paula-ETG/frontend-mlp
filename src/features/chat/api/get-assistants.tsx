import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/libs/axios";
import { type QueryConfig } from "@/libs/react-query";
import type { Assistant } from "@/types/api";

export const getAssistants = (): Promise<Assistant[]> => {
  return api.get(`/assistant`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
    },
  });
};

export const getAssistantsQueryOptions = () => {
  return queryOptions({
    queryKey: ["assistants"],
    queryFn: () => getAssistants(),
  });
};

type UseSessionsOptions = {
  queryConfig?: QueryConfig<typeof getAssistantsQueryOptions>;
};

export const useAssistants = ({ queryConfig }: UseSessionsOptions) => {
  return useQuery({
    ...getAssistantsQueryOptions(),
    ...queryConfig,
  });
};
