"use client";

import * as React from "react";
import { NavMain } from "@/ui/nav-main";
import { NavSecondary } from "@/ui/nav-secondary";
import { NavUser } from "@/ui/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/ui/sidebar";
import { Logo } from "@/ui/logo";
import { useSidebar } from "@/ui/sidebar";
import { useSession } from "next-auth/react";
import { Button } from "@/ui/button";
import Link from "next/link";
import { CreateClassroom } from "@/app/classroom/create";
import { JoinClassroom } from "@/app/classroom/join";
import { Plus, LogIn, type LucideIcon } from "lucide-react";

const data = {
  navMain: [
    {
      title: CreateClassroom,
      icon: Plus,
      isActive: true,
    },
    {
      title: JoinClassroom,
      icon: LogIn,
    },
  ],
  navSecondary: null,
};

export function AppSidebar({ ...props }: React.ComponentType<typeof Sidebar>) {
  const { open } = useSidebar();
  const { data: session } = useSession();

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex justify-between">
                {open && <Logo />}
                <SidebarTrigger />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {data.navMain && <NavMain items={data.navMain} />}
        {data.navSecondary && (
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        )}
      </SidebarContent>
      <SidebarFooter>
        {session && session.user ? (
          <NavUser
            name={session.user.name as string}
            email={session.user.email as string}
            image={session.user.image}
          />
        ) : (
          <Button asChild>
            <Link href="/login">
              <LogIn />
              <span className={`px-1 ${open ? "block" : "hidden"}`}>Login</span>
            </Link>
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}