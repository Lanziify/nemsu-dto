import React from "react";
import { DtoLogo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Bell, Mail, Contact, User, Settings } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import Link from "next/link";

type NavigationMenuItemsType = {
  buttonIcon: React.JSX.Element;
  buttonClassName?: string;
  popContentAlignment: "center" | "start" | "end" | undefined;
  content: React.JSX.Element;
};

function DtoHeader() {
  // const { user, userClaims, logoutUser } = useAuth();

  const profileItems = [
    {
      itemName: "Profile",
      path: "",
      icon: <User size={16} />,
    },
    {
      itemName: "Settings",
      path: "",
      icon: <Settings size={16} />,
    },
  ];

  const navigationMenuItems: NavigationMenuItemsType[] = [
    {
      buttonIcon: <Bell />,
      popContentAlignment: "center",
      content: (
        <div className="p-2">
          <p>Notifications</p>
        </div>
      ),
    },
    {
      buttonIcon: (
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      ),
      buttonClassName: "rounded-full p-0",
      popContentAlignment: "center",
      content: (
        <div>
          <div className="flex items-center justify-start gap-2 p-4 text-sm font-medium">
            <Avatar className="h-16 w-16">
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div>
              <strong className="text-xl">
                {/* {user?.displayName || "Admin"} */}
              </strong>
              {/* <p>{user?.email}</p> */}
              <p className="text-xs">Admin</p>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col justify-start p-2">
            {profileItems.map((profileItem, index) => (
              <Button
                key={index}
                asChild
                className="w-full justify-start gap-2"
                variant="ghost"
              >
                <Link href={profileItem.path}>
                  {profileItem.icon}
                  {profileItem.itemName}
                </Link>
              </Button>
            ))}
          </div>
          <Separator />
          <div className="flex flex-col justify-start p-2">
            <Button variant="ghost">Logout</Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <header className="bg-background/90 supports-[backdrop-filter]:bg-background/90 sticky top-0 right-0 left-0 z-10 w-full backdrop-blur">
      <div className="m-auto flex max-w-6xl justify-between p-4">
        <div className="flex justify-center align-middle">
          <DtoLogo width={40} height={40} fill="#000000" />
        </div>
        <div className="flex justify-center space-x-4 align-middle">
          {navigationMenuItems.map((navigationMenuItem, index) => (
            <Popover key={index}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className={`p-2 ${navigationMenuItem.buttonClassName}`}
                >
                  {navigationMenuItem.buttonIcon}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align={navigationMenuItem.popContentAlignment}
                className="w-fit p-0"
              >
                {navigationMenuItem.content}
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </div>
      <div
        data-orientation="horizontal"
        className="via-border h-[1px] w-full shrink-0 bg-gradient-to-r from-transparent to-transparent"
      />
    </header>
  );
}

export default DtoHeader;
