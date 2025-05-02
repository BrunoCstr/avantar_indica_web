import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SidebarSkeleton() {
  return (
    <Sidebar
      className="border-none"
      style={{ "--sidebar": "#170138" } as React.CSSProperties}
    >
      <SidebarContent className="bg-[#fff] text-black rounded-tr-3xl">
        <SidebarHeader>
          <div className="flex flex-row items-center gap-3 mt-5 ml-1">
            <Skeleton className="w-[3.125rem] h-[3.125rem] rounded-2xl bg-white" />
            <Skeleton className="w-[70%] h-[1rem]" />
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel className="text-black text-[1rem]">
            <Skeleton className="w-13 h-5 bg-white" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="pt-2">
                <SidebarMenuButton
                  asChild
                  className="transition-colors duration-700 ease-in-out text-[1rem] mt-2"
                >
                  <div>
                    <Skeleton className="w-5 h-5 bg-white" />
                    <Skeleton className="w-30 h-5 bg-white" />
                  </div>
                </SidebarMenuButton>
                <SidebarMenuButton
                  asChild
                  className="transition-colors duration-700 ease-in-out text-[1rem] mt-2"
                >
                  <div>
                    <Skeleton className="w-5 h-5 bg-white" />
                    <Skeleton className="w-30 h-5 bg-white" />
                  </div>
                </SidebarMenuButton>
                <SidebarMenuButton
                  asChild
                  className="transition-colors duration-700 ease-in-out text-[1rem] mt-2"
                >
                  <div>
                    <Skeleton className="w-5 h-5 bg-white" />
                    <Skeleton className="w-30 h-5 bg-white" />
                  </div>
                </SidebarMenuButton>
                <SidebarMenuButton
                  asChild
                  className="transition-colors duration-700 ease-in-out text-[1rem] mt-2"
                >
                  <div>
                    <Skeleton className="w-5 h-5 bg-white" />
                    <Skeleton className="w-30 h-5 bg-white" />
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-[#fff] text-black rounded-br-3xl">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full outline-none" asChild>
                <SidebarMenuButton className="cursor-pointer h-12 transition-colors duration-700 ease-in-out">
                  <Skeleton className="w-[3.125rem] h-[3.125rem] rounded-2xl bg-white"/>
                  <Skeleton className="w-[70%] h-[1rem] bg-white" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
