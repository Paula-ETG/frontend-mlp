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
  const [selectedModel, setSelectedModel] = useState("gpt-4.1");
  const [isOpen, setIsOpen] = useState(false);

  const modelOptions = [
    {
      value: "gpt-4.1",
      label: "GPT-4.1",
      description: "Most capable model, best for complex tasks",
      badge: "POPULAR",
    },
    {
      value: "gpt-4o",
      label: "GPT-4o",
      description: "Fastest model, optimized for speed",
      badge: "FAST",
    },
    {
      value: "o3-mini",
      label: "o3-mini",
      description: "Advanced reasoning capabilities",
      badge: "REASONING",
    },
  ];

  const handleModelSelect = (modelValue: string) => {
    setSelectedModel(modelValue);
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 px-4 z-40 bg-gray-50">
      <SidebarTrigger />
      <div>
        <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
          <DropdownMenuTrigger asChild>
            <div>
              <GptModelSelectButton selectedModel={selectedModel} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-[280px] z-[100] bg-white border border-gray-200 shadow-xl rounded-lg p-2"
            align="start"
            sideOffset={12}
          >
            <div className="px-3 py-2 border-b border-gray-100 mb-1">
              <h3 className="text-sm font-semibold text-gray-900">
                Select Model
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Choose the AI model for your conversations
              </p>
            </div>
            <DropdownMenuGroup>
              {modelOptions.map((model) => (
                <DropdownMenuItem
                  key={model.value}
                  className="relative px-3 py-3 cursor-grab hover:cursor-grab focus:cursor-grab rounded-md hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-150"
                  onClick={() => handleModelSelect(model.value)}
                >
                  <div className="flex items-start justify-between w-full">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 text-sm">
                          {model.label}
                        </span>
                        {model.badge && (
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                              model.badge === "POPULAR"
                                ? "bg-blue-100 text-blue-700"
                                : model.badge === "FAST"
                                ? "bg-green-100 text-green-700"
                                : model.badge === "REASONING"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {model.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {model.description}
                      </p>
                    </div>
                    {selectedModel === model.value && (
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 ml-3 flex-shrink-0">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <div className="px-3 py-2 border-t border-gray-100 mt-1">
              <p className="text-xs text-gray-400">
                💡 Model affects response quality and speed
              </p>
            </div>
          </DropdownMenuContent>
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
  // const user = useAuth();
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
        <SidebarInset className="bg-gray-50">
          <Header />
          <div className="flex flex-1 flex-col gap-4 bg-gray-50">
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
