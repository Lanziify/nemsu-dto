"use client";

import { sidebarItems } from "@/data/side-navigation-bar";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SideNavigationMenuItem } from "@/types/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const SideNavigationBar = () => {
  return (
    <aside className="sticky top-[125px] flex max-h-[calc(100vh_-_73px)] w-full max-w-72 flex-shrink-0 border-r max-sm:hidden">
      <nav className="flex flex-1 flex-col p-4">
        {sidebarItems.map((sidebarItem, index) =>
          sidebarItem.type === "normal" ? (
            <MenuItem key={index} {...sidebarItem} />
          ) : (
            <Accordion
              key={index}
              type="multiple"
              className="hover:bg-primary/5 rounded-md text-sm"
            >
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger>
                  <div className="flex items-center gap-3 ">
                    {sidebarItem.icon}
                    {sidebarItem.name}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col p-2">
                  {sidebarItem.children &&
                    sidebarItem.children.map((child, childIndex) => (
                      <MenuItem key={childIndex} {...child} />
                    ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
        )}
      </nav>
    </aside>
  );
};

const MenuItem: React.FC<SideNavigationMenuItem> = (props) => {
  const pathname = usePathname();
  const baseStyle =
    "px-3 py-2 inline-flex gap-3 items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/5";

  return (
    <Link
      className={clsx(baseStyle, {
        "bg-primary hover:bg-primary/90 text-white": pathname.includes(
          props.path,
        ),
      })}
      href={props.path}
    >
      {props.icon}
      {props.name}
    </Link>
  );
};

export default SideNavigationBar;
