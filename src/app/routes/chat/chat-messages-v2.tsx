import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useWebSocketConnection } from "@/hooks/use-ws";

import { useListMessages } from "@/features/chat/api/list-messages";

import {
  ChatInput,
  type ChatInputType,
} from "@/features/chat/components/chat-input";
import { ChatBubble } from "@/features/chat/components/chat-bubble";

import type { Message, MessageOutputMessageType } from "@/types/models";
import type {
  BaseEventResponse,
  AgentResponseTokenStreamEvent,
} from "@/types/api";
import { useQueryClient } from "@tanstack/react-query";

export const ChatBubbles = ({ message }: { message: Message }) => {
  const isUser = message.sender === "user"; // message can only be from user or assistant

  // Handle rendering of user message from input
  if (isUser) {
    const content = message.input?.content;
    if (!content) return null;
    return <ChatBubble content={content} isUser={true} />;
  }

  // Handle rendering of assistant message from output
  if (!message.output) return null;

  // Skip tool calls and other non-message types for now
  // TODO: Handle tool calls and other non-message types
  if (message.output.type !== "message") {
    return null;
  }

  // Get text content from assistant message output
  const contentObj = message.output as MessageOutputMessageType;
  const content = contentObj.content.find((c) => c.type === "output_text");
  if (!content) return null;

  return <ChatBubble content={content.text} isUser={false} />;
};

const handleEventStream = (event: BaseEventResponse) => {
  // Handle agent response token stream

  if (event.event === "agent_response") {
    // Get the data
    const agentResponseData = event.data;
    // Check the type of the data

    // If it's a token, then it will render the word by word like a typewriter, delta returns the word
    if (agentResponseData.type === "token") {
      const data = agentResponseData as AgentResponseTokenStreamEvent;
      return data.delta;
    }

    // If it's a message, then TODO, for now return null
    if (agentResponseData.type === "message") {
      // const data = agentResponseData as AgentResponseMessageOutputEvent;
      // return data.message;
      return null;
    }

    if (agentResponseData.type === "done") {
      return "//done//";
    }
  }

  // Ignore other events for now and return null
  return null;
};

export const EventResponseStream = ({
  onDoneStreaming,
}: {
  onDoneStreaming: () => void;
}) => {
  const { lastJsonMessage } = useWebSocketConnection();
  const [tokens, setTokens] = useState<string[]>([]);

  useEffect(() => {
    const event = lastJsonMessage as BaseEventResponse;
    if (event) {
      const token = handleEventStream(event);
      if (token && token !== "//done//") {
        setTokens((prev) => [...prev, token]);
      }
      if (token === "//done//") {
        onDoneStreaming();
        setTokens([]);
      }
    }
  }, [lastJsonMessage]);

  return (
    <ChatBubble content={tokens.join("")} isUser={false} isStreaming={true} />
  );
};

export const ChatMessages = () => {
  const { accountId, sessionId } = useParams();
  const queryClient = useQueryClient();

  const [newUserChat, setNewUserChat] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  console.log("rerendering chat messages");
  // Fetch past messages from database
  const { data: messages } = useListMessages({
    queryParams: {
      query: {
        account_id: accountId!,
        session_id: sessionId!,
      },
    },
  });

  // Auto-scroll when messages or newMessage changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [newUserChat]);

  const handleSendMessage = useCallback(
    (chatText: ChatInputType, files?: File[]) => {
      const textContent = chatText.content.trim();
      if (!textContent) return;
      setNewUserChat(textContent);
    },
    [newUserChat]
  );

  const handleDoneStreaming = () => {
    queryClient.invalidateQueries({
      queryKey: [
        "messages",
        { account_id: accountId!, session_id: sessionId! },
      ],
    });
    setNewUserChat(null);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Render past messages */}
          {messages?.map((message) => (
            <ChatBubbles key={message.id} message={message} />
          ))}
          {/* Temporarily render new message */}
          {newUserChat && (
            <>
              <ChatBubble content={newUserChat} isUser={true} />
              <div className="h-80">
                <EventResponseStream onDoneStreaming={handleDoneStreaming} />
              </div>
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="sticky bottom-0 bg-white px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSendMessage={handleSendMessage} sessionId={sessionId!} />
        </div>
      </div>
    </div>
  );
};
