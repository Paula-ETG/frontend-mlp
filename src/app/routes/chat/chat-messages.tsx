import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import useWebsocket from "react-use-websocket";
import type { QueryClient } from "@tanstack/react-query";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

import { ChatMessage } from "@/features/chat/components/chat-message";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/react-hook-form-wrapper";
import { FormControl, FormField, FormItem } from "@/components/ui/form";

import {
  getMessagesQueryOptions,
  useMessages,
} from "@/features/chat/api/get-messages";
import { ChatMessageStream } from "@/features/chat/components/chat-message-stream";
import { NewChatMessage } from "@/features/chat/components/new-chat-messages";

import type { Events, EventType } from "@/types/api";
import { Paperclip, SendHorizonal } from "lucide-react";
import { useAuth } from "@/hooks/use-user";

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const accountId = params.accountId as string;
    const sessionId = params.sessionId as string;

    await queryClient.ensureQueryData(
      getMessagesQueryOptions({ accountId, sessionId })
    );
    return { accountId, sessionId };
  };

const chatInputSchema = z.object({
  content: z.string().min(1, "Message cannot be empty"),
});
type ChatInputType = z.infer<typeof chatInputSchema>;

type ChatMessageProp = {
  isUser: boolean;
  content?: string;
  outputType?: "message" | string;
};

export const ChatMessages = () => {
  const { accountId, sessionId } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const auth = useAuth();
  const queryClient = useQueryClient();
  const [event, setEvent] = useState<Events | "idle">("idle");
  const [eventType, setEventType] = useState<EventType | undefined>(undefined);
  const [tokenStream, setTokenStream] = useState("");
  const [newMessages, setNewMessages] = useState<ChatMessageProp[]>([]);

  // Fetch messages from database
  const { data, isRefetching } = useMessages({
    queryParams: {
      accountId,
      sessionId,
    },
    queryConfig: {
      refetchOnWindowFocus: true,
    },
  });

  // Establish Websocket connection
  const WS_URL = `${import.meta.env.VITE_WS_URL}`;
  const { lastMessage, sendMessage } = useWebsocket(`${WS_URL}/ws/main`, {
    queryParams: {
      api_key: localStorage.getItem("journey_ai_api_key")!,
    },
  });

  // Clear new messages when refetching or when session changes
  useEffect(() => {
    setNewMessages([]);
    setTokenStream("");
    setEvent("idle");
    setEventType(undefined);
  }, [sessionId, isRefetching]);

  // Auto-scroll on new message or token stream
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [newMessages, tokenStream]);

  // Typing effect stream handler
  useEffect(() => {
    if (!lastMessage?.data) return;

    try {
      const parsedLastMessage = JSON.parse(lastMessage.data);
      const delta = parsedLastMessage.data?.delta;
      const type = parsedLastMessage.data?.type;

      if (parsedLastMessage.event) {
        setEvent(parsedLastMessage.event);
        setEventType(type);
      }

      // Handle token streaming for agent responses
      if (delta && parsedLastMessage.event === "agent_response") {
        setTokenStream((prev) => prev + delta);
      }

      // Final message complete — invalidate query to refetch messages
      if (type === "message" && parsedLastMessage.event === "agent_response") {
        // Clear the streaming state
        setTokenStream("");
        setEvent("idle");
        setEventType(undefined);

        // Clear new messages since they'll be fetched from server
        setNewMessages([]);

        // Invalidate the messages query to refetch from server
        queryClient.invalidateQueries({
          queryKey: ["messages", accountId, sessionId],
        });
      }
    } catch (error) {
      console.error("Error parsing websocket message:", error);
    }
  }, [lastMessage, accountId, sessionId, queryClient]);

  // Send message to websocket
  const handleSendMessage = (data: ChatInputType, formHelpers: any) => {
    const messageContent = data.content?.trim();

    if (!messageContent) return;

    // Add user message to new messages immediately for immediate UI feedback
    const userMessage = {
      isUser: true,
      content: messageContent,
      outputType: "message" as const,
    };

    setNewMessages((prev) => [...prev, userMessage]);

    // Set processing state
    setEvent("processing_session");
    setEventType(undefined);
    setTokenStream("");

    // Send message via websocket
    sendMessage(
      JSON.stringify({
        event: "ingest_message",
        data: {
          content: messageContent,
          session_id: sessionId,
        },
      })
    );

    // Reset the form
    formHelpers.reset({ content: "" });
  };

  return (
    <>
      <div className="flex flex-col flex-1 overflow-auto">
        {data?.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {newMessages &&
          newMessages?.map((msg, index) => (
            <NewChatMessage
              key={`${msg.content}-${index}`}
              isUser={msg.isUser}
              content={msg.content}
            />
          ))}
        <ChatMessageStream
          event={event}
          eventType={eventType}
          tokenStream={tokenStream}
        />
        <div ref={messagesEndRef} />
      </div>
      <div className="bg-white px-4 pb-4 sticky bottom-0 flex flex-col w-full text-center">
        <div className="w-full max-w-[800px] mx-auto">
          <Form
            onSubmit={handleSendMessage}
            schema={chatInputSchema}
            options={{
              defaultValues: {
                content: "",
              },
            }}
          >
            {({ control, reset, formState }) => (
              <div className="relative bg-background border rounded-lg overflow-hidden shadow-sm">
                <FormField
                  control={control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative bg-background border rounded-lg overflow-hidden shadow-sm">
                          <textarea
                            className="w-full border-none pt-3 !pb-0 px-4 placeholder:text-muted-foreground focus-visible:ring-0 focus:outline-none resize-none mb-12"
                            placeholder="Ask JourneyAI"
                            {...field}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                const form = e.currentTarget.form;
                                if (form) {
                                  form.dispatchEvent(
                                    new Event("submit", {
                                      cancelable: true,
                                      bubbles: true,
                                    })
                                  );
                                }
                              }
                            }}
                          />
                          <div className="absolute bottom-0 left-0 right-0 flex border-none items-center px-2 py-1 pb-2 border-t">
                            <div className="flex flex-wrap gap-1">
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground flex-shrink-0 p-0"
                              >
                                <Paperclip size={14} />
                                <span className="sr-only">Add attachment</span>
                              </Button>
                            </div>
                            <div className="ml-auto">
                              <Button
                                type="submit"
                                variant="default"
                                size="icon"
                                disabled={
                                  !field.value?.trim() ||
                                  event === "processing_session" ||
                                  event === "agent_response"
                                }
                                className="h-8 w-8 rounded-full flex-shrink-0 p-1"
                              >
                                <SendHorizonal size={14} />
                                <span className="sr-only">Send message</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}
          </Form>
        </div>
        <p className="text-sm text-gray-500">
          Journey AI can make mistakes. Check important info.
        </p>
      </div>
    </>
  );
};
