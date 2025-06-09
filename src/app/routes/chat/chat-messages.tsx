import {
  getMessagesQueryOptions,
  useMessages,
} from "@/features/chat/api/get-messages";
import { ChatMessage } from "@/features/chat/components/chat-message";
import type { QueryClient } from "@tanstack/react-query";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const accountId = params.accountId as string;
    const sessionId = params.sessionId as string;

    console.log({ accountId, sessionId });
    await queryClient.ensureQueryData(
      getMessagesQueryOptions({ accountId, sessionId })
    );
    return { accountId, sessionId };
  };

export const ChatMessages = () => {
  const { accountId, sessionId } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const { data } = useMessages({
    queryParams: {
      accountId,
      sessionId,
    },
  });

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      {data.map((msg) => (
        <ChatMessage message={msg} key={msg.id} />
      ))}
    </div>
  );
};
