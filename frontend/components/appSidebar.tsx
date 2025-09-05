'use client'
import {
  BarChart3, Boxes, ClipboardCheck, ClipboardList, Code, Edit3, Hash,
  LayoutDashboard, ListTree, MinusSquare, MoveDown, Package, PlusSquare,
  RefreshCw, ScanBarcode, Send, Settings, ShoppingCart, SplitSquareHorizontal,
  Truck, User, Warehouse, Workflow, History,
  Calendar,
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

const sideBarData = {
  menu: [
    {
      "_id": "dashboard",
      "title": "Dashboard",
      "href": "/dashboard",
      "icon": LayoutDashboard,
      "items": [{
        "_id": "overview", "title": "Overview", "href": "/dashboard/overview", "icon": Calendar
      }]
    },
    {
      "_id": "warehouse",
      "title": "Warehouse",
      "href": "/warehouse",
      "icon": Warehouse,
      "items": [
        { "_id": "asn", "title": "ASNs", "href": "/warehouse/asn", "icon": Package },
        { "_id": "receiving", "title": "Receiving", "href": "/warehouse/receiving", "icon": ScanBarcode, badgeData: 3 },
        { "_id": "putaway", "title": "Putaway", "href": "/warehouse/putaway", "icon": MoveDown, badgeData: 1 },
        { "_id": "picking", "title": "Picking", "href": "/warehouse/picking", "icon": ClipboardList, badgeData: 1 }
      ]
    },
    {
      "_id": "inventory",
      "title": "Inventory",
      "href": "/inventory",
      "icon": Boxes,
      "items": [
        { "_id": "stock", "title": "Stock Levels", "href": "/inventory/stock", "icon": BarChart3, badgeData: 25 },
        { "_id": "lots", "title": "Lots & Serials", "href": "/inventory/lots", "icon": Hash },
        { "_id": "adjustments", "title": "Adjustments", "href": "/inventory/adjustments", "icon": Edit3 },
        { "_id": "cycle", "title": "Cycle Counts", "href": "/inventory/cycle-counts", "icon": RefreshCw }
      ]
    },
    {
      "_id": "fulfillment",
      "title": "Fulfillment",
      "href": "/fulfillment",
      "icon": Truck,
      "items": [
        { "_id": "orders", "title": "Orders", "href": "/fulfillment/orders", "icon": ShoppingCart },
        { "_id": "allocation", "title": "Allocation", "href": "/fulfillment/allocation", "icon": SplitSquareHorizontal },
        { "_id": "packing", "title": "Packing", "href": "/fulfillment/packing", "icon": Package },
        { "_id": "shipping", "title": "Shipping", "href": "/fulfillment/shipping", "icon": Send }
      ]
    },
    {
      "_id": "workflow",
      "title": "Build Workflow",
      "href": "/workflow",
      "icon": Workflow,
      "items": [
        { "_id": "bom", "title": "BOMs", "href": "/workflow/boms", "icon": ListTree },
        { "_id": "workorders", "title": "Work Orders", "href": "/workflow/workorders", "icon": ClipboardCheck, badgeData: 10 },
        { "_id": "consumption", "title": "Consumption", "href": "/workflow/consumption", "icon": MinusSquare },
        { "_id": "production", "title": "Production", "href": "/workflow/production", "icon": PlusSquare, badgeData: 5 }
      ]
    }
  ],
  adminMenu: [
    { "_id": "users", "title": "Users & Roles", "href": "/admin/users", "icon": User },
    { "_id": "audit", "title": "Audit Logs", "href": "/admin/audit", "icon": History },
    { "_id": "api", "title": "API & Webhooks", "href": "/admin/api", "icon": Code }
  ]
}
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