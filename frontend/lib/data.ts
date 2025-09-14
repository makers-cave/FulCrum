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
  Cog,
  MapPinHouse
} from "lucide-react";
import { Customer, Part, PartLocation, Product, Tenant, WarehouseLocation } from "./types";
import { tree } from "next/dist/build/templates/app-page";

export const sideBarData = {
  menu: [
    {
      _id: "warehouse",
      title: "Warehouse",
      href: "/warehouse",
      "icon": Warehouse,
      "items": [
        { _id: "locations", title: "Locations", href: "/warehouse/locations", icon: MapPinHouse },
        { _id: "asn", title: "ASNs", href: "/warehouse/asn", "icon": Package },
        { _id: "receiving", title: "Receiving", href: "/warehouse/receiving", "icon": ScanBarcode, badgeData: 3 },
        { _id: "putaway", title: "Putaway", href: "/warehouse/putaway", "icon": MoveDown, badgeData: 1 },
        { _id: "picking", title: "Picking", href: "/warehouse/picking", "icon": ClipboardList, badgeData: 1 }
      ]
    },
    {
      _id: "inventory",
      title: "Inventory",
      href: "/inventory",
      "icon": Boxes,
      "items": [
        { _id: "parts", title: "Parts", href: "/inventory/parts", "icon": Cog },
        { _id: "products", title: "Products", href: "/inventory/products", "icon": Layers, badgeData: 100 },
        { _id: "stock", title: "Stock Levels", href: "/inventory/stocks", "icon": BarChart3, badgeData: 25 },
        { _id: "lots", title: "Lots & Serials", href: "/inventory/lots", "icon": Hash },
        { _id: "adjustments", title: "Adjustments", href: "/inventory/adjustments", "icon": Edit3 },
        { _id: "cycle", title: "Cycle Counts", href: "/inventory/counts", "icon": RefreshCw }
      ]
    },
    {
      _id: "fulfillment",
      title: "Fulfillment",
      href: "/fulfillment",
      "icon": Truck,
      "items": [
        { _id: "orders", title: "Orders", href: "/fulfillment/orders", "icon": ShoppingCart },
        { _id: "allocation", title: "Allocation", href: "/fulfillment/allocation", "icon": SplitSquareHorizontal },
        { _id: "packing", title: "Packing", href: "/fulfillment/packing", "icon": Package },
        { _id: "shipping", title: "Shipping", href: "/fulfillment/shipping", "icon": Send }
      ]
    },
    {
      _id: "workflow",
      title: "Build Workflow",
      href: "/workflow",
      "icon": Workflow,
      "items": [
        { _id: "bom", title: "BOMs", href: "/workflow/boms", "icon": ListTree },
        { _id: "workorders", title: "Work Orders", href: "/workflow/workorders", "icon": ClipboardCheck, badgeData: 10 },
        { _id: "consumption", title: "Consumption", href: "/workflow/consumption", "icon": MinusSquare },
        { _id: "production", title: "Production", href: "/workflow/production", "icon": PlusSquare, badgeData: 5 }
      ]
    },
    {
      _id: "partners", title: "Partners", href: "/partners", "icon": User2Icon,
      "items": [
        { _id: "tenants", title: "Tenants", href: "/partners/tenants", "icon": Tent, badgeData: 12 },
        { _id: "customers", title: "Customers", href: "/partners/customers", "icon": User, badgeData: 8 },
        { _id: "suppliers", title: "Suppliers", href: "/partners/suppliers", "icon": User, badgeData: 4 },
        { _id: "manufacturers", title: "Manufacturers", href: "/partners/manufacturers", "icon": User, badgeData: 2 },
        { _id: "carriers", title: "Carriers", href: "/partners/carriers", "icon": User, badgeData: 2 }
      ]
    }
  ],
  adminMenu: [

    { _id: "users", title: "Users & Roles", href: "/admin/users", "icon": User },
    { _id: "audit", title: "Audit Logs", href: "/admin/audit", "icon": History },
    { _id: "api", title: "API & Webhooks", href: "/admin/api", "icon": Code }
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
export const tenantData: Tenant[] = [
  { _id: "1", name: "Tenant Alpha", email: "alpha@example.com", phone: "555-111-2222", avatar: "/avatars/alpha.png" },
  { _id: "2", name: "Tenant Beta", email: "beta@example.com", phone: "555-333-4444", avatar: "/avatars/beta.png" },
  { _id: "3", name: "Tenant Gamma", email: "gamma@example.com", phone: "555-777-8888", avatar: "/avatars/gamma.png" },
];
export const customersData: Customer[] = [
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

export const inventoryDashboardData = {
  summaryStats: [
    { title: "Total Products", value: 4892, change: "+4.5%" },
    { title: "Available Stock", value: 2137, change: "-2.4%" },
    { title: "Low Stock", value: 1952, change: "+1.5%" },
    { title: "Out of Stock", value: 803, change: "-1.9%" },
  ],
  profitData: [
    { name: "Women’s Clothing", value: 400000, color: "#c8f230" },
    { name: "Accessories", value: 250000, color: "#a3e635" },
    { name: "Men’s Clothing", value: 200000, color: "#22c55e" },
    { name: "Footwear", value: 100000, color: "#10b981" },
    { name: "Children’s Clothing", value: 50000, color: "#0d9488" },
  ],
  orderSummary: [
    { name: "Sun", profit: 400 },
    { name: "Mon", profit: 700 },
    { name: "Tue", profit: 1100 },
    { name: "Wed", profit: 1300 },
    { name: "Thu", profit: 1674 },
    { name: "Fri", profit: 1200 },
    { name: "Sat", profit: 500 },
  ],
  stockLevels: [
    { product: "Silk Blend Summer Dress", current: 75, total: 110 },
    { product: "High-Waist Denim Jeans", current: 50, total: 80 },
    { product: "Women’s Wool Cardigan", current: 40, total: 80 },
    { product: "Kids’ Graphic Sweatshirt", current: 60, total: 100 },
  ],
  restocks: [
    { product: "Waterproof Ankle Boots", qty: 50, date: "Apr 25, 2029" },
    { product: "Vegan Leather Tote Bag", qty: 40, date: "Apr 30, 2029" },
    { product: "Men’s Running Sneakers", qty: 30, date: "May 5, 2029" },
    { product: "Luxury Watch Collection", qty: 20, date: "May 10, 2029" },
    { product: "Men’s Leather Wallet", qty: 60, date: "May 15, 2029" },
  ],
  activities: [
    {
      user: "Mario",
      action: "processed a return for a T-Shirt",
      time: "3:45 PM",
    },
    {
      user: "Emily",
      action: "updated High-Waist Denim Jeans quantity",
      time: "2:30 PM",
    },
    {
      user: "John Kramer",
      action: "added Men’s Summer Jacket to inventory",
      time: "2:00 PM",
    },
  ]
}

export const partsData: Part[] = [
  {
    _id: "1",
    name: "Stepper Motor NEMA 17",
    description: "High-torque stepper motor suitable for 3D printers and CNC machines.",
    category: "Motors",
    sku: "MTR-001",
    stock: 120,
    price: 14.99,
    manufacturer: { _id: "1", name: "Manufacturer Alpha"},
    image: "/motor.jpg",
    status: "In Stock",
    isAssemblable: true,
    isSellable: false,
    isPurchasable: true,
    owner: "Delightloop Inc.",
    defaultLocation: "US-HTX-Ergode",
    respnsibleUser: "Mario",
    isVirtual: false
  },
  {
    _id: "2",
    name: "Arduino Uno R3",
    description: "Popular microcontroller board based on the ATmega328P.",
    category: "Microcontrollers",
    sku: "MCU-002",
    stock: 15,
    price: 22.50,
    manufacturer: { _id: "2", name: "Manufacturer Beta"},
    image: "/arduino.jpg",
    status: "Low Stock",
    isAssemblable: true,
    isSellable: true,
    isPurchasable: true,
    owner: "SliceWorx LLC",
    defaultLocation: "US-HTX-Reserve",
    respnsibleUser: "Emily",
    isVirtual: false
  },
  {
    _id: "3",
    name: "L298N Motor Driver",
    description: "Dual H-Bridge motor driver module for controlling DC motors and stepper motors.",
    category: "Electronics",
    sku: "DRV-003",
    stock: 0,
    price: "$9.90",
    image: "/driver.jpg",
    status: "Out of Stock",
    isAssemblable: false,
    isSellable: false,
    isPurchasable: true,
    owner: "Countless Dimensions",
    defaultLocation: "US-HTX-Solon",
    respnsibleUser: "John Kramer"
  },
]
export const partsLocation:PartLocation[] = [
  {
    _id: "abce", 
    name: "US-HTX-Ergode", 
    quantity: 120,
    reserved: 5,
    subLocations: [
      { _id: "abce1", name: "Aisle 1, Shelf B", quantity: 50, reserved: 5 },
      { _id: "abce2", name: "Aisle 3, Shelf A", quantity: 30 },
      { _id: "abce3", name: "Aisle 5, Shelf C", quantity: 40 },
    ]
  },
  { _id: "abcf", 
    name: "US-HTX-Reserve", 
    quantity: 20,
    reserved: 2,
    subLocations: [ 
      { _id: "abcf1", name: "Backroom Shelf 1", quantity: 15 },
      { _id: "abcf3", name: "Backroom Shelf 2", quantity: 5, reserved:2 },
    ] 
  }
]

export const productsData: Product[] = [
  {
    id: "p1",
    name: "ESP32 IoT Starter Kit",
    sku: "PROD-ESP32KIT",
    status: "Published",
    price: 79.99,
    currency: "USD",
    image: "/esp32-kit.png",
    category: "Kits",
    availableQty: 48,
    reservedQty: 6,
    leadTimeDays: 7,
    weightKg: 0.45,
    dimensions: "22x16x6 cm",
    description: "Starter kit with ESP32, sensors, cables and example projects.",
    bathchPerWeek: 50,
    linkedParts: [
      { id: "part-esp32", partName: "ESP32-WROOM Module", partSku: "MTR-ESP32", qtyPerProduct: 1, linkType: "Assembly", stock: 120  },
      { id: "part-usb", partName: "USB Cable", partSku: "CAB-USB-A-B", qtyPerProduct: 1, linkType: "Content", stock: 150  },
      { id: "part-sensor", partName: "DHT22 Sensor", partSku: "SNS-DHT22", qtyPerProduct: 1, linkType: "Content", stock: 150  },
      { id: "part-box", partName: "Package Box", partSku: "BOX-002", qtyPerProduct: 1, linkType: "Packaging", stock: 300 },
      { id: "part-S649", partName: "Shipping Box", partSku: "CAB-USB-A-B", qtyPerProduct: 1, linkType: "Shipping", stock: 500 },
    ],
    manufacturer: { _id: "1", name: "Manufacturer Alpha"}
  },
  {
    id: "p2",
    name: "Robotics Kit - Beginner",
    sku: "PROD-ROBO-BEG",
    status: "Draft",
    price: 149.0,
    currency: "USD",
    image: "/robotics-kit.png",
    category: "Kits",
    availableQty: 12,
    reservedQty: 2,
    leadTimeDays: 14,
    weightKg: 1.8,
    dimensions: "40x30x10 cm",
    description: "Entry-level robotics kit with motors, wheels and controller.",
    bathchPerWeek: 20,
    linkedParts: [
      { id: "part-motor", partName: "Stepper Motor NEMA 17", partSku: "MTR-001", qtyPerProduct: 2, linkType: "Content", stock: 120 },
      { id: "part-driver", partName: "Motor Driver L298N", partSku: "DRV-003", qtyPerProduct: 1, linkType: "Assembly", stock: 150 }, 
      { id: "part-box", partName: "Package Box", partSku: "BOX-002", qtyPerProduct: 1, linkType: "Packaging", stock: 300 },
      { id: "part-S649", partName: "Shipping Box", partSku: "CAB-USB-A-B", qtyPerProduct: 1, linkType: "Shipping", stock: 500 },
    ],
    manufacturer: { _id: "2", name: "Manufacturer Beta" }
  },
];

export const sampleLocations:WarehouseLocation[] = [
  { _id: "loc1", name: "US-HTX-Ergode", description: "Main warehouse in Houston, TX", category: "Warehouse", sku: "WH-HTX", status: "Active" },
  { _id: "loc2", name: "US-HTX-Reserve", description: "Reserve stock area in Houston, TX", category: "Warehouse", sku: "WH-HTX-RSV", status: "Active" },
  { _id: "loc3", name: "US-HTX-Solon", description: "Overflow storage in Solon, OH", category: "Warehouse", sku: "WH-SOL", status: "Inactive" },
];