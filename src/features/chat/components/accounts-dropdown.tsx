import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SidebarMenuButton } from "@/components/ui/sidebar";

import {
  ChevronsUpDown,
  GalleryVerticalEnd,
  CirclePlus,
  UserRoundPlus,
} from "lucide-react";

import { AccountDropdownMenuItem } from "./account-dropdown-menu-item";
import { useAccounts } from "../api/get-accounts";

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

export function AccountsDropdown() {
  const { data } = useAccounts({});

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-medium">Company Name</span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          {data?.map((account) => (
            <AccountDropdownMenuItem key={account.id} name={account.name} />
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {accountsDropdownOptions.map((item) => (
            <DropdownMenuItem key={item.name} className="text-xs">
              {item.name}
              <DropdownMenuShortcut>{item.icon}</DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
