import { useAuth } from "@/hooks/use-user";
import { useAccounts } from "@/features/chat/api/get-accounts";
import { Navigate } from "react-router";
import { useState } from "react";
import { CreateAccountModal } from "@/features/chat/components/create-account-modal";
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
import { Button } from "@/components/ui/button";
import { MessageCircle, House } from "lucide-react";

const DashboardContent = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center text-gray-500">
        <MessageCircle className="mx-auto h-16 w-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Welcome to Journey AI</h2>
        <p className="text-lg">Create your first account to get started</p>
      </div>
    </div>
  );
};

const DashboardSidebar = () => {
  const sidebarItems = [
    {
      title: "Home",
      icon: House,
    },
    {
      title: "New Chat",
      icon: MessageCircle,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-center h-16 text-lg font-semibold">
          Journey AI
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>GENERAL</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton disabled>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button disabled>Invite Teammate</Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export const DashboardPage = () => {
  const { isAuthenticated } = useAuth();
  const { data: accounts, isLoading } = useAccounts({});
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user has accounts, redirect to first account
  if (accounts && accounts.length > 0) {
    return <Navigate to={`/${accounts[0].id}`} replace />;
  }

  // Show dashboard with create account modal
  const hasNoAccounts = !accounts || accounts.length === 0;

  const handleAccountCreated = (account: any) => {
    // Navigate to the newly created account
    window.location.href = `/${account.id}`;
  };

  return (
    <>
      <div className={hasNoAccounts ? "blur-sm" : ""}>
        <SidebarProvider>
          <DashboardSidebar />
          <SidebarInset>
            <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 px-4 z-50">
              <SidebarTrigger />
            </header>
            <DashboardContent />
          </SidebarInset>
        </SidebarProvider>
      </div>

      <CreateAccountModal
        isOpen={hasNoAccounts || showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleAccountCreated}
        isForced={hasNoAccounts}
      />
    </>
  );
};
