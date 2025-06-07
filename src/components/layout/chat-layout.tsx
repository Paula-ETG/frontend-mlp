import type React from "react";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { ChatSidebar } from "./chat-sidebar";
import { GptModelDropdown } from "@/features/chat/components/gpt-model-dropdown";

interface ChatLayoutProps {
  children: React.ReactNode;
}

export const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <SidebarProvider>
      <ChatSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 px-4 z-50">
          <SidebarTrigger />
          <div>
            <GptModelDropdown />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};
