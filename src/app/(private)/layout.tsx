import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/myComponents/app-sidebar";
import "../globals.css";

export default function PrivateLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-screen w-full">
        <SidebarTrigger className="cursor-pointer absolute mt-3 ml-2 text-white" />
        {children}
      </main>
    </SidebarProvider>
  );
}
