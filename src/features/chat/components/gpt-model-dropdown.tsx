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

import { ChevronDown, CirclePlus, UserRoundPlus } from "lucide-react";
import journeyAILogoFull from "@/assets/logo/JourneyAI-Logo-Full.svg";
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

export function GptModelDropdown() {
  const { data } = useAccounts({});

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="">
            <img src={journeyAILogoFull} width={110} />
            <span className="text-xs text-gray-700">GPT 4.1 Mini</span>
          </div>
          <ChevronDown />
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
