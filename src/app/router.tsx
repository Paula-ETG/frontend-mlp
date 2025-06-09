import { createBrowserRouter, RouterProvider } from "react-router";
import { useMemo } from "react";
import { QueryClient } from "@tanstack/react-query";
import {
  loader as chatLayoutLoader,
  ChatLayout,
} from "@/components/layout/chat-layout";
import { ChatBody } from "./routes/chat/chat-body";
import { NewChat } from "./routes/chat/new-chat";
import {
  ChatMessages,
  loader as chatMessagesLoader,
} from "./routes/chat/chat-messages";
import { ErrorPage } from "./routes/error";

const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: "/:accountId",
      element: <ChatLayout />,
      loader: chatLayoutLoader(queryClient),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/:accountId",
          element: (
            <ChatBody>
              <NewChat />
            </ChatBody>
          ),
        },
        {
          path: "/:accountId/s/:sessionId",
          element: (
            <ChatBody>
              <ChatMessages />
            </ChatBody>
          ),
          loader: chatMessagesLoader(queryClient),
        },
      ],
    },
  ]);

export const AppRouter = ({ queryClient }: { queryClient: QueryClient }) => {
  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);
  return <RouterProvider router={router} />;
};
