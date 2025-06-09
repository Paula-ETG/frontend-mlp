import { ChevronsUpDown, GalleryVerticalEnd } from "lucide-react";

export const AccountSelectButton = ({
  accountName,
  icon,
}: {
  accountName: string;
  icon?: string;
}) => {
  return (
    <>
      <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
        {icon ? (
          <img src={icon} className="size-4" />
        ) : (
          <GalleryVerticalEnd className="size-4" />
        )}
      </div>
      <div className="flex flex-col gap-0.5 leading-none">
        <span className="font-medium">{accountName}</span>
      </div>
      <ChevronsUpDown className="ml-auto" />
    </>
  );
};
