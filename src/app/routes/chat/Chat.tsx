import { ChatLayout } from "@/components/layout/chat-layout";
import { useAssistants } from "@/features/chat/api/get-assistants";
import { AssistantCard } from "@/features/chat/components/assistant-card";
import { ChatInput } from "@/features/chat/components/chat-input";
import { ChatMessage } from "@/features/chat/components/chat-message";
import { LoginDialog } from "@/features/login/components/login-dialog";

export const Chat = () => {
  const { data } = useAssistants({});

  return (
    <ChatLayout>
      <LoginDialog />
      <main className="flex flex-col gap-5 h-full mt-10">
        <div className="flex flex-col flex-1 overflow-auto justify-center px-4 items-center">
          <h1 className="text-5xl font-mabry-pro-bold">Hi! I'm Journey AI</h1>
          <h1 className="text-2xl font-mabry-pro-regular sm:text-center max-w-3xl">
            Your AI-powered assistant for automating sales tasks, enriching
            leads, and optimizing customer success.
          </h1>
          <div className="pt-4 grid auto-rows-min gap-4 md:grid-cols-2">
            {data?.map((assistant) => (
              <AssistantCard key={assistant.id} />
            ))}
            <AssistantCard />
            <AssistantCard />
            <AssistantCard />
          </div>
        </div>
        {/* <div className="flex-1 overflow-auto">
          <ChatMessage isUser message="asdamdokansdasnd" />
          <ChatMessage isUser={false} message="asdamdokansdasnd" />
        </div> */}
        <div className="bg-white px-4 pb-4 sticky bottom-0 flex flex-col w-full text-center">
          <ChatInput placeholder="Ask Journey AI" />
          <p className="text-sm text-gray-500">
            Journey AI can make mistakes. Check important info.
          </p>
        </div>
      </main>
    </ChatLayout>
  );
};
