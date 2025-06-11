import { AssistantCard } from "@/features/chat/components/assistant-card";
import { useAssistants } from "@/features/chat/api/get-assistants";
import { useCreateSession } from "@/features/chat/api/create-session";
import { useNavigate, useParams } from "react-router";
import { DisabledChatInput } from "@/features/chat/components/disabled-chat-input";

export const NewChat = () => {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const { data } = useAssistants({});
  const createSession = useCreateSession({
    mutationConfig: {
      onError: () => {},
      onSuccess: (data) => {
        navigate(`/${accountId}/s/${data.id}`);
      },
    },
  });

  const handleClick = (id: string) => {
    createSession.mutate({
      title: "New Session",
      summary: "",
      account_id: accountId!,
      assistant_id: id,
    });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto px-4 py-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-5xl font-mabry-pro-bold mb-4">
              Hi! I'm Journey AI
            </h1>
            <p className="text-2xl font-mabry-pro-regular text-gray-600 max-w-3xl mx-auto">
              Your AI-powered assistant for automating sales tasks, enriching
              leads, and optimizing customer success.
            </p>
          </div>

          {/* Assistant Selection Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <button className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                All
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200">
                Lead Generation
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200">
                Strategies
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200">
                Sales Pitch
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200">
                Templates
              </button>
            </div>

            {/* Assistant Cards Grid */}
            <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
              {data?.map((assistant) => (
                <AssistantCard
                  id={assistant.id}
                  title={assistant.name}
                  description={assistant.description}
                  key={assistant.id}
                  handleClick={handleClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Disabled Chat Input */}
      <DisabledChatInput />
    </div>
  );
};
