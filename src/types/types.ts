export type SideNavigationMenuItem =
  | {
      type: "normal";
      name: string;
      path: string;
      icon: React.JSX.Element;
    }
  | {
      type: "accordion";
      name: string;
      path: string;
      icon: React.JSX.Element;
      children?: SideNavigationMenuItem[];
    };

export type DropDownMenuItem = {
  name: string;
  path: string;
  icon: React.JSX.Element;
};
