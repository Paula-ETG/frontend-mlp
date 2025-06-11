import { Card } from "@/components/ui/card";
import type { Messages } from "@/types/api";
import { cn } from "@/utils/cn";

export const ChatMessage = ({ message }: { message: Messages }) => {
  const isUser = message.sender === "user";

  // For user messages, get content from input
  if (isUser) {
    const content = message.input?.content;
    if (!content) return null;

    return (
      <div className="flex w-full justify-end">
        <div className="flex flex-col space-y-1 max-w-[80%]">
          <Card className="px-4 py-3 bg-blue-600 text-white border-blue-600 rounded-2xl shadow-sm">
            <p className="text-sm whitespace-pre-wrap leading-relaxed">
              {content}
            </p>
          </Card>
        </div>
      </div>
    );
  }

  // For assistant messages, handle different output types
  if (!message.output) return null;

  // Skip tool calls and other non-message types for now
  if (message.output.type !== "message") {
    return null;
  }

  // Get text content from message output
  const contentObj = message.output.content?.find(
    (c) => c.type === "output_text"
  );
  const content = contentObj?.text;

  if (!content) return null;

  return (
    <div className="flex w-full justify-start">
      <div className="flex flex-col space-y-1 max-w-[80%]">
        <Card className="px-4 py-3 bg-white text-gray-900 border-gray-200 rounded-2xl shadow-sm">
          <p className="text-sm whitespace-pre-wrap leading-relaxed">
            {content}
          </p>
        </Card>
      </div>
    </div>
  );
};
