import { Card } from "@/components/ui/card";
// import type { Messages } from "@/types/api";
import { cn } from "@/utils/cn";

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
          <p className="text-sm whitespace-pre-wrap leading-relaxed">
            {content}
          </p>
        </Card>
        {/* {timestamp && (
          <span className="text-xs text-gray-500 px-2">{timestamp}</span>
        )} */}
      </div>
    </div>
  );
};
