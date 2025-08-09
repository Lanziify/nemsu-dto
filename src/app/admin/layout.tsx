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
      <SidebarInset className="overflow-hidden">
        <AppMainHeader />
        <div className="mx-auto flex w-full flex-1 flex-col p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
