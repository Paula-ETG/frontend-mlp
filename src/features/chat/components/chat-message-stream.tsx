import type { Events, EventType } from "@/types/api";
import { LoadingDots } from "./loading";
import { Card } from "@/components/ui/card";

export const ChatMessageStream = ({
  event,
  eventType,
  tokenStream,
}: {
  event: Events | "idle";
  eventType?: EventType;
  tokenStream?: string;
}) => {
  if (event === "processing_session") {
    return <LoadingDots />;
  }

  if (event === "agent_response") {
    if (eventType === "done") {
      return undefined;
    }

    if (eventType === "token") {
      return (
        <div className={"flex w-full gap-3 p-4 justify-start"}>
          <div className="flex flex-col space-y-2 max-w-[80%]">
            <Card
              className={
                "px-4 py-3 text-sm bg-gray-50 text-gray-900 border-gray-200"
              }
            >
              <p className="whitespace-pre-wrap">{tokenStream}</p>
            </Card>
          </div>
        </div>
      );
    }

    return <LoadingDots />;
  }

  return undefined;
};
