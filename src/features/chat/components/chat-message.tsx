import { Card } from "@/components/ui/card";
import type { Messages } from "@/types/api";
import { cn } from "@/utils/cn";

export const ChatMessage = ({ message }: { message: Messages }) => {
  const isUser = message.sender === "user";
  const content = isUser
    ? message.input?.content
    : message.output?.content[0].text;

  return (
    <div
      className={cn(
        "flex w-full gap-3 p-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex flex-col space-y-2 max-w-[80%]",
          isUser && "items-end"
        )}
      >
        <Card
          className={cn(
            "px-4 py-3 text-sm",
            isUser
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-gray-50 text-gray-900 border-gray-200"
          )}
        >
          <p className="whitespace-pre-wrap">{content}</p>
        </Card>
        {/* {timestamp && (
          <span className="text-xs text-gray-500 px-2">{timestamp}</span>
        )} */}
      </div>
    </div>
  );
};
