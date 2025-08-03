import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import { sidebarItems } from "@/data/side-navigation-bar";
import { SidebarItem } from "@/types/types";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronRight } from "lucide-react";

export function MainSideNav() {
  const groupedNavigations = sidebarItems.reduce<SidebarItem[][]>(
    (acc, item) => {
      const lastGroup = acc[acc.length - 1];

      if (!lastGroup || lastGroup[0].type !== item.type) {
        acc.push([item]);
      } else {
        lastGroup.push(item);
      }

      return acc;
    },
    [],
  );

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {groupedNavigations.map((group) => {
          if (group.some((f) => f.type === "normal")) {
            return group.map((item, index) => (
              <SidebarMenuButton key={index} asChild tooltip={item.name}>
                <Link href={item.path}>
                  {item.icon && <item.icon />}
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            ));
          } else {
            return group.map((item, accordionIndex) => (
              <Collapsible
                key={item.name}
                asChild
                defaultOpen={true}
                className="group/collapsible"
              >
                <SidebarMenuItem key={accordionIndex}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.name}>
                      {item.icon && <item.icon />}
                      <span className="truncate">{item.name}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden transition-all duration-300 ease-in-out">
                    <SidebarMenuSub>
                      {item.type === "collapsible" &&
                        item.children &&
                        item.children.map((child) => (
                          <SidebarMenuSubItem key={child.name}>
                            <SidebarMenuSubButton asChild>
                              <Link href={child.path}>
                                {child.icon && <child.icon />}
                                <span className="truncate">{child.name}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ));
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
