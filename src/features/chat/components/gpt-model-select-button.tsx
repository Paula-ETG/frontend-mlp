import React from "react";
import { ChevronDown } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import journeyAILogoFull from "@/assets/logo/JourneyAI-Logo-Full.svg";

interface GptModelSelectButtonProps {
  selectedModel?: string;
}

export const GptModelSelectButton = ({
  selectedModel = "gpt-4.1",
}: GptModelSelectButtonProps) => {
  const getDisplayName = (model: string) => {
    switch (model) {
      case "gpt-4o":
        return "GPT-4o";
      case "o3-mini":
        return "o3-mini";
      case "gpt-4.1":
        return "GPT-4.1";
      default:
        return model;
    }
  };

  return (
    <SidebarMenuButton
      size="lg"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-grab hover:cursor-grab hover:bg-gray-100 transition-colors duration-150"
    >
      <div className="flex flex-col items-start">
        <img src={journeyAILogoFull} width={110} className="mb-1" />
        <span className="text-xs text-gray-700 font-medium">
          {getDisplayName(selectedModel)}
        </span>
      </div>
      <ChevronDown className="w-4 h-4 text-gray-500" />
    </SidebarMenuButton>
  );
};
