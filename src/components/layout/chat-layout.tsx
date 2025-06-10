import {
  CirclePlus,
  UserRoundPlus,
  MessageCircle,
  House,
  ChevronsUpDown,
} from "lucide-react";
import { type QueryClient } from "@tanstack/react-query";
import {
  NavLink,
  Outlet,
  useLoaderData,
  useNavigate,
  type LoaderFunctionArgs,
} from "react-router";
import { useState } from "react";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { GptModelSelectButton } from "@/features/chat/components/gpt-model-select-button";
import { AccountDropdownMenuItem } from "@/features/chat/components/account-dropdown-menu-item";
import { AccountSelectButton } from "@/features/chat/components/accounts-select-button";
import { CreateAccountModal } from "@/features/chat/components/create-account-modal";
import { useSessions } from "@/features/chat/api/get-sessions";
import { useAccounts } from "@/features/chat/api/get-accounts";
import {
  getAccountQueryOptions,
  useAccount,
} from "@/features/chat/api/get-account";
import { useAuth } from "@/hooks/use-user";
import type { Session } from "@/types/api";

const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const accountId = params.accountId as string;
    await queryClient.ensureQueryData(getAccountQueryOptions({ accountId }));
    return { accountId };
  };

const ChatSidebarHeader = ({
  handleAccountClick,
  onCreateAccount,
}: {
  handleAccountClick: (accountId: string) => void;
  onCreateAccount: () => void;
}) => {
  const { accountId } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const { data: accountsList } = useAccounts({});
  const { data: account } = useAccount({ queryParams: { accountId } });

  const accountsDropdownOptions = [
    {
      name: "Create Account",
      icon: <CirclePlus />,
    },
    {
      name: "Join Account",
      icon: <UserRoundPlus />,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <AccountSelectButton accountName={account?.name || ""} />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dropdown-content-width-full">
        <DropdownMenuGroup>
          {accountsList?.map((account) => (
            <AccountDropdownMenuItem
              key={account.id}
              name={account.name}
              handleClick={() => handleAccountClick(account.id)}
            />
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {accountsDropdownOptions.map((item) => (
            <DropdownMenuItem
              key={item.name}
              className="text-xs"
              onClick={() => {
                if (item.name === "Create Account") {
                  onCreateAccount();
                }
              }}
            >
              {item.name}
              <DropdownMenuShortcut>{item.icon}</DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ChatSidebarGeneralGroupContent = ({
  accountId,
}: {
  accountId: string;
}) => {
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

  return (
    <SidebarGroup>
      <SidebarGroupLabel>GENERAL</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink to={`/${accountId}`}>
                  <item.icon />
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export const ChatSidebarSessionsGroupContent = ({
  sessionsData,
  handleSessionClick,
}: {
  sessionsData: Session[];
  handleSessionClick: (sessionId: string) => void;
}) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>HISTORY</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {sessionsData.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                onClick={() => handleSessionClick(item.id)}
              >
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

const Header = () => {
  return (
    <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 px-4 z-50">
      <SidebarTrigger />
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <GptModelSelectButton />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dropdown-content-width-full"></DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

const ChatSidebarUserDropdown = () => {
  const { user, logout } = useAuth();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="" alt="" />
                <AvatarFallback className="rounded-lg">
                  {(
                    user?.profile?.first_name?.[0] ||
                    user?.email?.[0] ||
                    "U"
                  ).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {user?.profile?.first_name || user?.email || "User"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dropdown-content-width-full">
            <DropdownMenuItem onClick={logout}>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const ChatLayout = () => {
  const { accountId } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const user = useAuth();
  const navigate = useNavigate();
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);

  const { data: sessions } = useSessions({
    queryParams: {
      accountId,
    },
  });

  const handleAccountClick = (accountId: string) => {
    navigate(`/${accountId}`);
  };

  const handleSessionClick = (sessionId: string) => {
    navigate(`/${accountId}/s/${sessionId}`);
  };

  const handleCreateAccount = () => {
    setShowCreateAccountModal(true);
  };

  const handleAccountCreated = (account: any) => {
    navigate(`/${account.id}`);
  };

  return (
    <>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <ChatSidebarHeader
              handleAccountClick={handleAccountClick}
              onCreateAccount={handleCreateAccount}
            />
          </SidebarHeader>
          <SidebarContent>
            <ChatSidebarGeneralGroupContent accountId={accountId} />
            <ChatSidebarSessionsGroupContent
              handleSessionClick={handleSessionClick}
              sessionsData={sessions || []}
            />
          </SidebarContent>
          <SidebarFooter>
            <Button disabled>Invite Teammate</Button>
            <ChatSidebarUserDropdown />
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <Header />
          <div className="flex flex-1 flex-col gap-4">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>

      <CreateAccountModal
        isOpen={showCreateAccountModal}
        onClose={() => setShowCreateAccountModal(false)}
        onSuccess={handleAccountCreated}
      />
    </>
  );
};

export { ChatLayout, loader };
