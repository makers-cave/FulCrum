 'use client'
import {
  ChevronDown,
  User2,
  ChevronUp
} from "lucide-react"
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem,
  SidebarSeparator
} from "./ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { sideBarData } from "@/lib/data"


const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <Image src="/logo.svg" alt="logo" width={20} height={20} />
                <span>FulCrum</span>
                <label>Maker's Cave</label>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        {sideBarData.menu.map((menuitem) => (
          <Collapsible defaultOpen={true} className="group/collapsible" key={menuitem._id}>
            <SidebarGroup key={menuitem._id}>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>{menuitem.title}
                  <ChevronDown className="ml-auto transition-transform duration-200 ease-in-out group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuitem.items && menuitem.items.map((item) => (
                      <SidebarMenuItem key={item._id}>
                        <SidebarMenuButton asChild>
                          <Link href={item.href}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                        {item.badgeData && <SidebarMenuBadge>{item.badgeData}</SidebarMenuBadge>}
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Administration <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {sideBarData.adminMenu.map((menuitem) => (
                  <DropdownMenuItem key={menuitem._id}>{menuitem.title}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar