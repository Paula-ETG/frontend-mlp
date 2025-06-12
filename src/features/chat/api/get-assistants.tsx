import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/libs/axios";
import { type QueryConfig } from "@/libs/react-query";
import type { Assistant } from "@/types/api";

type GetAssistantsParams = {
  category?: string;
};

export const getAssistants = async (
  params?: GetAssistantsParams
): Promise<Assistant[]> => {
  // Add intentional 0.8 second delay to show loading animation
  await new Promise((resolve) => setTimeout(resolve, 800));

  const queryParams = new URLSearchParams();
  if (params?.category) {
    queryParams.append("category", params.category);
  }

  const url = `/assistant${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;
  return api.get(url);
};

export const getAssistantsQueryOptions = (params?: GetAssistantsParams) => {
  return queryOptions({
    queryKey: ["assistants", params?.category || "all"],
    queryFn: () => getAssistants(params),
  });
};

type UseAssistantsOptions = {
  queryParams?: GetAssistantsParams;
  queryConfig?: QueryConfig<typeof getAssistantsQueryOptions>;
};

export const useAssistants = ({
  queryParams,
  queryConfig,
}: UseAssistantsOptions = {}) => {
  return useQuery({
    ...getAssistantsQueryOptions(queryParams),
    ...queryConfig,
  });
};
