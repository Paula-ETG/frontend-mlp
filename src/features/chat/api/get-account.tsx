import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { api } from "@/libs/axios";
import { type QueryConfig } from "@/libs/react-query";
import type { Account } from "@/types/api";

type UseAccountQueryParams = {
  accountId: string;
};

export const getAccount = ({
  accountId,
}: UseAccountQueryParams): Promise<Account> => {
  return api.get(`/account/:accountId`, {
    urlParams: {
      ":accountId": accountId,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
    },
  });
};

export const getAccountQueryOptions = (queryParams: UseAccountQueryParams) => {
  return queryOptions({
    queryKey: ["account", queryParams],
    queryFn: () => getAccount(queryParams),
  });
};

type UseAccountOptions = {
  queryParams: UseAccountQueryParams;
  queryConfig?: QueryConfig<typeof getAccountQueryOptions>;
};

export const useAccount = ({ queryParams, queryConfig }: UseAccountOptions) => {
  return useSuspenseQuery({
    ...getAccountQueryOptions(queryParams),
    ...queryConfig,
  });
};
