import { ChevronDown } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import journeyAILogoFull from "@/assets/logo/JourneyAI-Logo-Full.svg";

export const GptModelSelectButton = () => {
  return (
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
  );
};
