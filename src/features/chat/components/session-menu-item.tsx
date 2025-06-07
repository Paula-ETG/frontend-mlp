import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

export const SessionMenuItem = ({
  title,
  url,
}: {
  title: string;
  url: string;
}) => {
  return (
    <SidebarMenuItem key={title}>
      <SidebarMenuButton asChild>
        <a href={url}>
          <span>{title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
