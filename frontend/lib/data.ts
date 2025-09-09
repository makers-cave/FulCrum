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
  Tent,
  Layers,
  Cog
} from "lucide-react";
import { Customer, Tenant } from "./types";

export const sideBarData = {
  menu: [
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
        { "_id": "parts", "title": "Parts", "href": "/inventory/parts", "icon": Cog },
        { "_id": "products", "title": "Products", "href": "/inventory/products", "icon": Layers, badgeData: 100 },
        { "_id": "stock", "title": "Stock Levels", "href": "/inventory/stock", "icon": BarChart3, badgeData: 25 },
        { "_id": "lots", "title": "Lots & Serials", "href": "/inventory/lots", "icon": Hash },
        { "_id": "adjustments", "title": "Adjustments", "href": "/inventory/adjustments", "icon": Edit3 },
        { "_id": "cycle", "title": "Cycle Counts", "href": "/inventory/counts", "icon": RefreshCw }
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
    {
      "_id": "partners", "title": "Partners", "href": "/partners", "icon": User2Icon,
      "items": [
        { "_id": "tenants", "title": "Tenants", "href": "/partners/tenants", "icon": Tent, badgeData: 12 },
        { "_id": "customers", "title": "Customers", "href": "/partners/customers", "icon": User, badgeData: 8 },
        { "_id": "suppliers", "title": "Suppliers", "href": "/partners/suppliers", "icon": User, badgeData: 4 },
        { "_id": "manufacturers", "title": "Manufacturers", "href": "/partners/manufacturers", "icon": User, badgeData: 2 },
        { "_id": "carriers", "title": "Carriers", "href": "/partners/carriers", "icon": User, badgeData: 2 }
      ]
    }
  ],
  adminMenu: [

    { "_id": "users", "title": "Users & Roles", "href": "/admin/users", "icon": User },
    { "_id": "audit", "title": "Audit Logs", "href": "/admin/audit", "icon": History },
    { "_id": "api", "title": "API & Webhooks", "href": "/admin/api", "icon": Code }
  ]
}

export const partnerDashboardData = {
    kpis: [{ title: "Tenants", value: 12, delta: 2, icon: require("lucide-react").Home },
        { title: "Customers", value: 240, delta: -3, icon: require("lucide-react").Users },
        { title: "Suppliers", value: 56, delta: 5, icon: require("lucide-react").Truck },
        { title: "Manufacturers", value: 12, delta: 0, icon: require("lucide-react").Factory },
        { title: "Carriers", value: 18, delta: 1, icon: require("lucide-react").Truck }],
    topCustomers: [
      { name: "Acme Retail", orders: 312 },
      { name: "GreenGrocers", orders: 208 },
      { name: "Shopwise", orders: 150 },
      { name: "UrbanGoods", orders: 98 },
    ],
    carriersPerformance: [
      { name: "FastLine", onTimePct: 98 },
      { name: "TransCo", onTimePct: 93 },
      { name: "ShipFast", onTimePct: 88 },
    ],
    recentActivity: [
      { when: "2h ago", who: "Acme Retail", type: "Order placed", summary: "SO-1024 (12 items)" },
      { when: "6h ago", who: "Alpha Supply", type: "Shipment received", summary: "ASN-556" },
      { when: "1d ago", who: "Beta Manufacturing", type: "Work order started", summary: "WO-210" },
    ],
    expiringContracts: [
      { name: "Alpha Supply", type: "Supplier", expires: "2025-09-25", status: "Action required" },
      { name: "FleetX", type: "Carrier", expires: "2025-10-12", status: "Renewal due" },
    ],
    directory: [
      { name: "Acme Retail", type: "Customer", status: "Active", lastActivity: "2025-09-05" },
      { name: "Alpha Supply", type: "Supplier", status: "Active", lastActivity: "2025-09-04" },
      { name: "Beta Manufacturing", type: "Manufacturer", status: "On hold", lastActivity: "2025-08-20" },
      { name: "FleetX", type: "Carrier", status: "Active", lastActivity: "2025-08-30" },
    ],
  };

  // 🔹 Sample tanent data
export const tenantData:Tenant[] = [
    { _id: "1", name: "Tenant Alpha", email: "alpha@example.com", phone: "555-111-2222", avatar: "/avatars/alpha.png" },
    { _id: "2", name: "Tenant Beta", email: "beta@example.com", phone: "555-333-4444", avatar: "/avatars/beta.png" },
    { _id: "3", name: "Tenant Gamma", email: "gamma@example.com", phone: "555-777-8888", avatar: "/avatars/gamma.png" },
  ];
  export const customersData:Customer[] = [
    { _id: "1", name: "Customer Alpha", email: "alpha@example.com", phone: "555-111-2222", avatar: "/avatars/alpha.png" },
    { _id: "2", name: "Customer Beta", email: "beta@example.com", phone: "555-333-4444", avatar: "/avatars/beta.png" },
    { _id: "3", name: "Customer Gamma", email: "gamma@example.com", phone: "555-777-8888", avatar: "/avatars/gamma.png" },
  ];
  export const suppliersData = [
    { _id: "1", name: "Supplier Alpha", email: "alpha@example.com", phone: "555-111-2222", avatar: "/avatars/alpha.png" },
    { _id: "2", name: "Supplier Beta", email: "beta@example.com", phone: "555-333-4444", avatar: "/avatars/beta.png" },
    { _id: "3", name: "Supplier Gamma", email: "gamma@example.com", phone: "555-777-8888", avatar: "/avatars/gamma.png" },
  ];
  export const manufacturersData = [
    { _id: "1", name: "Manufacturer Alpha", email: "alpha@example.com", phone: "555-111-2222", avatar: "/avatars/alpha.png" },
    { _id: "2", name: "Manufacturer Beta", email: "beta@example.com", phone: "555-333-4444", avatar: "/avatars/beta.png" },
    { _id: "3", name: "Manufacturer Gamma", email: "gamma@example.com", phone: "555-777-8888", avatar: "/avatars/gamma.png" },
  ];
  export const carriersData = [
    { _id: "1", name: "Carrier Alpha", email: "alpha@example.com", phone: "555-111-2222", avatar: "/avatars/alpha.png" },
    { _id: "2", name: "Carrier Beta", email: "beta@example.com", phone: "555-333-4444", avatar: "/avatars/beta.png" },
    { _id: "3", name: "Carrier Gamma", email: "gamma@example.com", phone: "555-777-8888", avatar: "/avatars/gamma.png" },
  ];
  export const sampleTenantOrders = {
    "1": [
      { _id: "ORD-101", item: "W_idget A", qty: 120, status: "Shipped" },
      { _id: "ORD-102", item: "W_idget B", qty: 50, status: "Pending" },
    ],
    "2": [
      { _id: "ORD-201", item: "Gadget X", qty: 200, status: "Delivered" },
    ],
    "3": [
      { _id: "ORD-301", item: "Part Z", qty: 75, status: "Shipped" },
    ],
  };