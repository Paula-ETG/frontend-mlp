import type React from "react";

export const ChatBody = ({ children }: { children: React.ReactNode }) => {
  return <main className="flex flex-col gap-5 h-full mt-10">{children}</main>;
};
