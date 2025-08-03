import { LucideIcon } from "lucide-react";

export type SidebarItem =
  | {
      type: "normal";
      name: string;
      path: string;
      icon: LucideIcon;
    }
  | {
      type: "collapsible";
      name: string;
      path: string;
      icon: LucideIcon;
      children?: SidebarItem[];
    };

export type DropDownMenuItem = {
  name: string;
  path: string;
  icon: React.JSX.Element;
};
