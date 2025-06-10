import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/libs/axios";
import { type QueryConfig } from "@/libs/react-query";
import type { Assistant } from "@/types/api";

export const getAssistants = (): Promise<Assistant[]> => {
  return api.get(`/assistant`);
};

export const getAssistantsQueryOptions = () => {
  return queryOptions({
    queryKey: ["assistants"],
    queryFn: () => getAssistants(),
  });
};

type UseAssistantsOptions = {
  queryConfig?: QueryConfig<typeof getAssistantsQueryOptions>;
};

export const useAssistants = ({ queryConfig }: UseAssistantsOptions) => {
  return useQuery({
    ...getAssistantsQueryOptions(),
    ...queryConfig,
  });
};
