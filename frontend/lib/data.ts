import {
    BarChart3, Boxes, ClipboardCheck, ClipboardList, Code, Edit3, Hash,
    LayoutDashboard, ListTree, MinusSquare, MoveDown, Package, PlusSquare,
    RefreshCw, ScanBarcode, Send, Settings, ShoppingCart, SplitSquareHorizontal,
    Truck, User, Warehouse, Workflow, History,
    Calendar,
    ChevronDown,
    User2,
    ChevronUp,
    User2Icon,
    Tent
  } from "lucide-react"
  
  export const sideBarData = {
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
      },
      { "_id": "partners", "title": "Partners", "href": "/admin/partners", "icon": User2Icon,
        "items": [{ "_id": "tanents", "title": "Tanents", "href": "/admin/partners", "icon": Tent, badgeData: 12 },
        { "_id": "customers", "title": "Customers", "href": "/admin/partners/customers", "icon": User, badgeData: 8 },
        { "_id": "suppliers", "title": "Suppliers", "href": "/admin/partners/suppliers", "icon": User, badgeData: 4 },
        { "_id": "manufacturers", "title": "Manufacturers", "href": "/admin/partners/manufacturers", "icon": User, badgeData: 2 },
        { "_id": "carriers", "title": "Carriers", "href": "/admin/partners/carriers", "icon": User, badgeData: 2 }
      ]
       }
    ],
    adminMenu: [
      
      { "_id": "users", "title": "Users & Roles", "href": "/admin/users", "icon": User },
      { "_id": "audit", "title": "Audit Logs", "href": "/admin/audit", "icon": History },
      { "_id": "api", "title": "API & Webhooks", "href": "/admin/api", "icon": Code }
    ]
  }