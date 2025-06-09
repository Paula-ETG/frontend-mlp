import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { api } from "@/libs/axios";
import { type QueryConfig } from "@/libs/react-query";
import type { Session } from "@/types/api";

type UseSessionsQueryParams = {
  accountId: string;
};

export const getSessions = ({
  accountId,
}: UseSessionsQueryParams): Promise<Session[]> => {
  return api.get(`/session`, {
    params: {
      account_id: accountId,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
    },
  });
};

export const getSessionsQueryOptions = (
  queryParams: UseSessionsQueryParams
) => {
  return queryOptions({
    queryKey: ["sessions", queryParams],
    queryFn: () => getSessions(queryParams),
  });
};

type UseSessionsOptions = {
  queryParams: UseSessionsQueryParams;
  queryConfig?: QueryConfig<typeof getSessionsQueryOptions>;
};

export const useSessions = ({
  queryParams,
  queryConfig,
}: UseSessionsOptions) => {
  return useSuspenseQuery({
    ...getSessionsQueryOptions(queryParams),
    ...queryConfig,
  });
};
