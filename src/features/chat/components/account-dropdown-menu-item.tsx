import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { GalleryVerticalEnd } from "lucide-react";

// import { cva } from "class-variance-authority";
// const variants = cva("", {
//   variants: {
//     selected: {
//       true: "",
//       false: "",
//     }
//   },
// })

export const AccountDropdownMenuItem = ({
  name,
  handleClick,
}: {
  name: string;
  handleClick: () => void;
}) => {
  return (
    <DropdownMenuItem onClick={handleClick}>
      <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
        <GalleryVerticalEnd className="size-4" />
      </div>
      <div className="flex flex-col gap-0.5 leading-none">
        <span className="font-medium">{name}</span>
      </div>
    </DropdownMenuItem>
  );
};
