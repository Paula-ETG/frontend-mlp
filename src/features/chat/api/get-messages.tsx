import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { api } from "@/libs/axios";
import { type QueryConfig } from "@/libs/react-query";
import type { Messages } from "@/types/api";

type UseMessagesQueryParams = {
  sessionId: string;
  accountId: string;
};

export const getMessages = ({
  sessionId,
  accountId,
}: UseMessagesQueryParams): Promise<Messages[]> => {
  return api.get(`/message`, {
    params: {
      account_id: accountId,
      session_id: sessionId,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
    },
  });
};

export const getMessagesQueryOptions = (
  queryParams: UseMessagesQueryParams
) => {
  return queryOptions({
    queryKey: ["messages", queryParams],
    queryFn: () => getMessages(queryParams),
  });
};

type UseMessagesOptions = {
  queryParams: UseMessagesQueryParams;
  queryConfig?: QueryConfig<typeof getMessagesQueryOptions>;
};

export const useMessages = ({
  queryParams,
  queryConfig,
}: UseMessagesOptions) => {
  return useSuspenseQuery({
    ...getMessagesQueryOptions(queryParams),
    ...queryConfig,
  });
};
