import { AppMainHeader } from "@/components/shared/main-header";
import { AppMainSidebar } from "@/components/shared/main-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const data = await getData(params.id);
  // if (!data) notFound(); // Triggers your not-found.tsx

  return (
    <SidebarProvider>
      <AppMainSidebar />
      <SidebarInset>
        <AppMainHeader />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
