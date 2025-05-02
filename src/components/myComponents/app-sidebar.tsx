"use client";

import React from "react";
import Image from "next/image";
import { ChevronUp } from "lucide-react";
import { RiDashboardFill } from "react-icons/ri";
import { MdRequestPage } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import { FaPeopleArrows } from "react-icons/fa";
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
  SidebarMenuSubItem,
  SidebarMenuSub,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useAuth } from "@/context/Auth";
import {SidebarSkeleton} from "@/components/skeletons/SidebarSkeleton"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: RiDashboardFill,
  },
  {
    title: "Parceiros",
    url: "/partners",
    icon: FaPeopleArrows,
  },
  {
    title: "Indicações",
    url: "/indications",
    icon: FaShare,
  },
];

const subItems = [
  { tittle: "Afiliação", url: "/membership-requests" },
  { tittle: "Saque", url: "/withdraw-requests" },
];

export function AppSidebar() {
  const { userData, signOut, isLoading } = useAuth();

  if (isLoading) {
    return <SidebarSkeleton/>
  }

  return (
    <Sidebar
      className="border-none"
      style={{ "--sidebar": "#170138" } as React.CSSProperties}
    >
      <SidebarContent className="bg-[#fff] text-black rounded-tr-3xl">
        <SidebarHeader>
          <div className="flex flex-row items-center gap-3 mt-5 ml-1">
            <Image
              className="rounded-2xl cursor-pointer"
              src="/default_unit_profile_picture.png"
              alt="logo"
              width={50}
              height={50}
            />
            <span>{userData?.unitName}</span>
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel className="text-black text-[1rem]">
            MENU
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="pt-1">
                  <SidebarMenuButton
                    asChild
                    className="transition-colors duration-700 ease-in-out text-[1rem]"
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem className="pt-1">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="cursor-pointer transition-colors duration-700 ease-in-out text-[1rem]">
                      <MdRequestPage />
                      <span>Solicitações</span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {subItems.map((item) => (
                        <SidebarMenuSubItem
                          key={item.tittle}
                          className="cursor-pointer"
                        >
                          <a href={item.url}>
                            <span>{item.tittle}</span>
                          </a>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
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
                  <Image
                    className="rounded-2xl"
                    src={
                      userData?.profilePicture ?? "/default_profile_picture.png"
                    }
                    alt="logo"
                    width={35}
                    height={35}
                  />{" "}
                  {userData?.displayName}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem className="cursor-pointer">
                  <span>Conta</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => signOut()}
                >
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
