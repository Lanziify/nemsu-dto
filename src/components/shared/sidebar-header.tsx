import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { DtoLogo } from "./main-logo";

export function DtoSidebarHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <a href="#" className="h-max">
            <div className="aspect-square size-8 rounded-lg bg-black p-2">
              <DtoLogo width="100%" height="100%" fill="#fff" />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="truncate font-bold">NEMSU | DTO</span>
              <span className="truncate text-xs">
                Digital Transformation Office
              </span>
            </div>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
