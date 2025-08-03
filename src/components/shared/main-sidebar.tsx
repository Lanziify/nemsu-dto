import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { DtoSidebarHeader } from "./sidebar-header";
import { MainSideNav } from "./main-sidenav";

export function AppMainSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <DtoSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <MainSideNav />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
