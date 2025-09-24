'use client'
import {
  ChevronDown,
  User2,
  ChevronUp,
  LayoutDashboard
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
import { usePathname } from "next/navigation"


const AppSidebar = () => {
  const pathname = usePathname()
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
        {/* Dashboard group */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between px-2 py-1">
            {/* Left section: Icon + Label */}
            <div className="flex items-center gap-2 flex-1">
              {/* Group Icon */}
              <LayoutDashboard className="h-5 w-5 text-gray-600" />

              {/* Label → navigates to overview page */}
              <Link
                href={"/"}
                className="font-medium hover:underline truncate"
              >
                Dashboard
              </Link>
            </div>
          </SidebarGroupLabel>
        </SidebarGroup>
        {sideBarData.menu.map((menuitem) => {

          return (

            <Collapsible
              defaultOpen={true}
              className="group/collapsible"
              key={menuitem._id}
            >
              <SidebarGroup>
                <SidebarGroupLabel className="flex items-center justify-between px-2 py-1">
                  {/* Left section: Icon + Label */}
                  <div className="flex items-center gap-2 flex-1">
                    {/* Group Icon */}
                    <menuitem.icon className="h-5 w-5 text-600" />

                    {/* Label → navigates to overview page */}
                    <Link
                      href={menuitem.href}
                      className="font-medium hover:underline truncate"
                    >
                      {menuitem.title}
                    </Link>
                  </div>

                  {/* Right section: Chevron toggle */}
                  <CollapsibleTrigger asChild>
                    <button
                      className="p-1 rounded hover:bg-gray-200 transition"
                      aria-label={`Toggle ${menuitem.title}`}
                    >
                      <ChevronDown className="h-4 w-4 ml-1 transition-transform duration-200 ease-in-out group-data-[state=open]/collapsible:rotate-180" />
                    </button>
                  </CollapsibleTrigger>
                </SidebarGroupLabel>

                {/* Submenu */}
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {menuitem.items &&
                        menuitem.items.map((item) => {
                          const isActive = pathname.startsWith(item.href)
                          return (
                            <SidebarMenuItem key={item._id} className={` ${isActive
                                ? "bg-muted font-semibold text-primary rounded-md"
                                : "hover:bg-muted/50"
                              }`}>
                              <SidebarMenuButton asChild>
                                <Link href={item.href} className="flex items-center gap-2">
                                  <item.icon className="h-4 w-4 text-gray-500" />
                                  <span>{item.title}</span>
                                </Link>
                              </SidebarMenuButton>
                              {item.badgeData && (
                                <SidebarMenuBadge>{item.badgeData}</SidebarMenuBadge>
                              )}
                            </SidebarMenuItem>
                          )
                        })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          )
        })}
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