import React from "react";
import { DtoLogo } from "./Logo";
import { ProfileMenu } from "./ProfileMenu";

async function DtoHeader() {
  const navigationMenuItems = [
    {
      trigger: (index: number) => <ProfileMenu key={index.toString()} />,
    },
  ];

  return (
    <header className="bg-background/90 supports-[backdrop-filter]:bg-background/90 sticky top-0 right-0 left-0 z-10 w-full backdrop-blur">
      <div className="m-auto flex max-w-6xl justify-between p-4">
        <div className="flex justify-center align-middle">
          <DtoLogo width={40} height={40} fill="#000000" />
        </div>
        <div className="flex justify-center space-x-4 align-middle">
          {navigationMenuItems.map(({ trigger }, index) => trigger(index))}
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
