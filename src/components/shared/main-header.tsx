import React from "react";
import { ProfileMenu } from "./profile-menu";
import { SidebarTrigger } from "../ui/sidebar";

export async function AppMainHeader() {
  const navigationMenuItems = [
    {
      trigger: (index: number) => <ProfileMenu key={index.toString()} />,
    },
  ];

  return (
    <header className="bg-background/90 supports-[backdrop-filter]:bg-background/90 sticky top-0 right-0 left-0 w-full backdrop-blur">
      <div className="m-auto flex justify-between p-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
        </div>
        <div className="flex justify-center space-x-4 align-middle">
          {navigationMenuItems.map(({ trigger }, index) => trigger(index))}
        </div>
      </div>
      <div
        data-orientation="horizontal"
        className="via-border bg-border h-[1px] w-full shrink-0"
      />
    </header>
  );
}
