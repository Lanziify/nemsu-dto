"use client"

import { useAuth } from "@/hooks/use-auth";
import { DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu";
// import { Button } from "../ui/button";

export default function LogoutButton() {
  const { logoutUser } = useAuth();

  // return <Button onClick={logoutUser}>Logout</Button>;

  return (
    <DropdownMenuItem onClick={logoutUser}>
      Log out
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}
