import type React from "react";

export const ChatBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="flex flex-col gap-5 h-full mt-10">
        {children}
        {/* <div className="bg-white px-4 pb-4 sticky bottom-0 flex flex-col w-full text-center">
          <ChatInput placeholder="Ask Journey AI" />
          <p className="text-sm text-gray-500">
            Journey AI can make mistakes. Check important info.
          </p>
        </div> */}
      </main>
    </>
  );
};
