import { Card } from "@/components/ui/card";
// import type { Messages } from "@/types/api";
import { cn } from "@/utils/cn";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ChatMessageProp = {
  isUser: boolean;
  content?: string;
  outputType?: "message" | string;
};

export const NewChatMessage = ({ isUser, content }: ChatMessageProp) => {
  if (!content) return null;

  return (
    <div
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
    >
      <div className="flex flex-col space-y-1 max-w-[80%]">
        <Card
          className={cn(
            "px-4 py-3 rounded-2xl shadow-sm text-sm",
            isUser
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-900 border-gray-200"
          )}
        >
          {isUser ? (
            <p className="text-sm whitespace-pre-wrap leading-relaxed">
              {content}
            </p>
          ) : (
            <div className="markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          )}
        </Card>
        {/* {timestamp && (
          <span className="text-xs text-gray-500 px-2">{timestamp}</span>
        )} */}
      </div>
    </div>
  );
};
