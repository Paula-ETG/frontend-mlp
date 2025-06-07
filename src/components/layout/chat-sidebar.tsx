import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { MessageCircle, House } from "lucide-react";
import { AccountsDropdown } from "@/features/chat/components/accounts-dropdown";
import { UserDropdown } from "@/features/chat/components/user-dropdown";
import { Button } from "../ui/button";
import { useSessions } from "@/features/chat/api/get-sessions";

const sidebarItems = [
  {
    title: "Home",
    icon: House,
    url: "#",
  },
  {
    title: "New Chat",
    icon: MessageCircle,
    url: "#",
  },
];
export const ChatSidebar = () => {
  const { data } = useSessions({
    queryParams: {
      accountId: "7b7ec80aa447465ab614e787f652e7e1",
    },
  });

  return (
    <Sidebar>
      <SidebarHeader>
        <AccountsDropdown />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>GENERAL</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>HISTORY</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data?.map((session) => (
                <SidebarMenuItem key={session.id}>
                  <SidebarMenuButton asChild>
                    <a href={session.id}>
                      <span>{session.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button>Invite Teammate</Button>
        <UserDropdown />
      </SidebarFooter>
    </Sidebar>
  );
};
