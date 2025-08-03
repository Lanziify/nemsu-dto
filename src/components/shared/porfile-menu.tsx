import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import LogoutButton from "./logout-button";

type MenuItemType =
  | { type: "item"; label: string; path: string; shortcut?: string }
  | { type: "group"; label: string; items: MenuItemType[] };

export async function ProfileMenu() {
  const user = await getCurrentUser();

  const menuItems: MenuItemType[] = [
    {
      type: "group",
      label: "My Account",
      items: [
        {
          type: "item",
          label: "Profile",
          path: "profle",
        },
        {
          type: "item",
          label: "Settings",
          path: "settigs",
        },
      ],
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="h-fit w-fit rounded-full p-0"
        >
          <Avatar>
            <AvatarFallback>
              {user?.displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <div className="flex items-center gap-2 p-2">
          <Avatar>
            <AvatarFallback>
              {user?.displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-bold">{user?.displayName}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        {menuItems.map((item) => {
          const key = `${item.type}-${item.label}`;

          return item.type === "group" ? (
            <DropdownMenuGroup key={item.label}>
              <DropdownMenuLabel>{item.label}</DropdownMenuLabel>
              {item.items.map((child) =>
                child.type === "item" ? (
                  <DropdownMenuItem key={child.label} asChild>
                    <Link href={child.path}>{child.label}</Link>
                  </DropdownMenuItem>
                ) : null,
              )}
            </DropdownMenuGroup>
          ) : (
            <DropdownMenuItem key={key}>GitHub</DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>GitHub</DropdownMenuItem>
        <DropdownMenuItem disabled>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
