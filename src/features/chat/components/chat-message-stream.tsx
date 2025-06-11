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
    return (
      <div className="flex w-full gap-3 p-4 justify-start">
        <div className="flex flex-col space-y-2 max-w-[80%]">
          <LoadingDots />
        </div>
      </div>
    );
  }

  if (event === "agent_response") {
    if (tokenStream && tokenStream.length > 0) {
      return (
        <div className="flex w-full gap-3 p-4 justify-start">
          <div className="flex flex-col space-y-2 max-w-[80%]">
            <Card className="px-4 py-3 text-sm bg-gray-50 text-gray-900 border-gray-200">
              <p className="whitespace-pre-wrap">{tokenStream}</p>
              <span className="inline-block w-2 h-5 bg-blue-500 ml-1 animate-text-cursor">
                |
              </span>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div className="flex w-full gap-3 p-4 justify-start">
        <div className="flex flex-col space-y-2 max-w-[80%]">
          <LoadingDots />
        </div>
      </div>
    );
  }

  return null;
};
