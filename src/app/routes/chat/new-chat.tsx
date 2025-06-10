import { AssistantCard } from "@/features/chat/components/assistant-card";
import { useAssistants } from "@/features/chat/api/get-assistants";
import { useCreateSession } from "@/features/chat/api/create-session";
import { useNavigate, useParams } from "react-router";

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
      title: "test1",
      summary: "test1",
      account_id: accountId!,
      assistant_id: id,
    });
  };

  return (
    <div className="flex flex-col flex-1 overflow-auto justify-center px-4 items-center">
      <h1 className="text-5xl font-mabry-pro-bold">Hi! I'm Journey AI</h1>
      <h1 className="text-2xl font-mabry-pro-regular sm:text-center max-w-3xl">
        Your AI-powered assistant for automating sales tasks, enriching leads,
        and optimizing customer success.
      </h1>
      <div className="pt-4 grid auto-rows-min gap-4 md:grid-cols-2">
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
  );
};
