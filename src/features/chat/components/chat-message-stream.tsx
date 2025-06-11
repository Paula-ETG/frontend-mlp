import type { Events, EventType } from "@/types/api";
import { LoadingDots } from "./loading";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
      <div className="flex w-full justify-start">
        <div className="flex flex-col space-y-1 max-w-[80%]">
          <div className="px-4 py-3">
            <LoadingDots className="text-gray-400" />
          </div>
        </div>
      </div>
    );
  }

  if (event === "agent_response") {
    if (tokenStream && tokenStream.length > 0) {
      return (
        <div className="flex w-full justify-start">
          <div className="flex flex-col space-y-1 max-w-[80%]">
            <Card className="px-4 py-3 bg-white text-gray-900 border-gray-200 rounded-2xl shadow-sm">
              <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {tokenStream}
                </ReactMarkdown>
                <span className="inline-block w-0.5 h-4 bg-gray-400 ml-1 animate-text-cursor">
                  |
                </span>
              </div>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div className="flex w-full justify-start">
        <div className="flex flex-col space-y-1 max-w-[80%]">
          <div className="px-4 py-3">
            <LoadingDots className="text-gray-400" />
          </div>
        </div>
      </div>
    );
  }

  return null;
};
