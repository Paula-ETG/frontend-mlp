import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { SendHorizonal, Paperclip } from "lucide-react";
import { useState } from "react";

export const ChatInput = ({
  className,
  placeholder,
}: {
  className?: string;
  placeholder?: string;
}) => {
  const [input, setInput] = useState("");
  return (
    <div className={cn("w-full max-w-[800px] mx-auto", className)}>
      <form className="relative">
        <div className="relative bg-background border rounded-lg overflow-hidden shadow-sm">
          <textarea
            // ref={mergedRef}
            placeholder={placeholder}
            className="w-full border-none pt-3 !pb-0 px-4 placeholder:text-muted-foreground focus-visible:ring-0 focus:outline-none resize-y mb-12"
            // value={input}
            onChange={(e) => setInput(e.target.value)}
            // onKeyDown={(e) => {
            //   if (e.key === "Enter" && !e.shiftKey) {
            //     e.preventDefault();
            //     handleSendMessage(e);
            //   }
            // }}
            rows={1}
            // disabled={isLoading}
            // {...props}
          />
          <div
            // ref={toolbarRef}
            className="absolute bottom-0 left-0 right-0 flex border-none items-center px-2 py-1 pb-2 border-t"
          >
            <div className="flex flex-wrap gap-1">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground flex-shrink-0 p-0"
              >
                <Paperclip size={14} />
                <span className="sr-only">Add attachment</span>
              </Button>
            </div>
            <div className="ml-auto">
              <Button
                type="submit"
                variant="default"
                size="icon"
                // disabled={!input.trim()}
                className={cn(
                  "h-8 w-8 rounded-full flex-shrink-0 p-1",
                  input.trim()
                    ? "text-primary hover:text-primary"
                    : "text-muted-foreground"
                )}
              >
                <SendHorizonal size={14} />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
