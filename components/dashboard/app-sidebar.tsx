"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { FileText, Home, Upload, Clock, User, Settings, HelpCircle, LogOut } from "lucide-react"
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
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Upload Report",
    url: "/dashboard/upload",
    icon: Upload,
  },
  {
    title: "History",
    url: "/dashboard/history",
    icon: Clock,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },
]

export function AppSidebar() {
  const supabase = createClientComponentClient()
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    // Fetch logged-in user
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.email) setUserEmail(user.email)
    })

    // Subscribe to auth changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [supabase])

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileText className="size-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">MediScan AI</span>
            <span className="text-xs text-muted-foreground">Dashboard</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/settings">
                    <Settings />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/help">
                    <HelpCircle />
                    <span>Help & Support</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 hover:bg-sidebar-accent">
              <Avatar className="size-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>{userEmail?.[0]?.toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col items-start text-left">
                <span className="text-sm font-medium">{userEmail || "User"}</span>
                <span className="text-xs text-muted-foreground">{userEmail || "user@example.com"}</span>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <User className="mr-2 size-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 size-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
