import DtoHeader from "@/components/shared/DtoHeader";
import SideNavigationBar from "@/components/shared/SideNavigationBar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <DtoHeader />
      <div className="relative m-auto flex w-full max-w-6xl flex-1 border-x max-sm:w-[93%]">
        <SideNavigationBar />
        <div className="w-full min-w-0 p-4">{children}</div>
      </div>
    </div>
  );
}
