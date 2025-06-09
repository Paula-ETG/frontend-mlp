import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { api } from "@/libs/axios";
import { type QueryConfig } from "@/libs/react-query";
import type { Session } from "@/types/api";

type UseSessionQueryParams = {
  sessionId: string;
};

export const getSession = ({
  sessionId,
}: UseSessionQueryParams): Promise<Session[]> => {
  return api.get(`/session/:sessionId`, {
    urlParams: {
      ":sessionId": sessionId,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
    },
  });
};

export const getSessionQueryOptions = (queryParams: UseSessionQueryParams) => {
  return queryOptions({
    queryKey: ["session", queryParams],
    queryFn: () => getSession(queryParams),
  });
};

type UseSessionOptions = {
  queryParams: UseSessionQueryParams;
  queryConfig?: QueryConfig<typeof getSessionQueryOptions>;
};

export const useSession = ({ queryParams, queryConfig }: UseSessionOptions) => {
  return useSuspenseQuery({
    ...getSessionQueryOptions(queryParams),
    ...queryConfig,
  });
};
