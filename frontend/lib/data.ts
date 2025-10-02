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
import { Customer, Lot, LotHistory, Order, Part, PartLocation, Product, SelectData, StockOverview, Tenant, Location, Supplier } from "./types";
import { tree } from "next/dist/build/templates/app-page";
import { Children } from "react";

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
  { id: "1", name: "Tenant Alpha", email: "alpha@example.com", phone: "555-111-2222", avatar: "/avatars/alpha.png" },
  { id: "2", name: "Tenant Beta", email: "beta@example.com", phone: "555-333-4444", avatar: "/avatars/beta.png" },
  { id: "3", name: "Tenant Gamma", email: "gamma@example.com", phone: "555-777-8888", avatar: "/avatars/gamma.png" },
];
export const customersData: Customer[] = [
  { id: "1", name: "Customer Alpha", email: "alpha@example.com", phone: "555-111-2222", avatar: "/avatars/alpha.png" },
  { id: "2", name: "Customer Beta", email: "beta@example.com", phone: "555-333-4444", avatar: "/avatars/beta.png" },
  { id: "3", name: "Customer Gamma", email: "gamma@example.com", phone: "555-777-8888", avatar: "/avatars/gamma.png" },
];
export const suppliersData: Supplier[] = [
  { id: "1", name: "Supplier Alpha", email: "alpha@example.com", phone: "555-111-2222", avatar: "/avatars/alpha.png" },
  { id: "2", name: "Supplier Beta", email: "beta@example.com", phone: "555-333-4444", avatar: "/avatars/beta.png" },
  { id: "3", name: "Supplier Gamma", email: "gamma@example.com", phone: "555-777-8888", avatar: "/avatars/gamma.png" },
];
export const manufacturersData = [
  { id: "1", name: "Manufacturer Alpha", email: "alpha@example.com", phone: "555-111-2222", avatar: "/avatars/alpha.png" },
  { id: "2", name: "Manufacturer Beta", email: "beta@example.com", phone: "555-333-4444", avatar: "/avatars/beta.png" },
  { id: "3", name: "Manufacturer Gamma", email: "gamma@example.com", phone: "555-777-8888", avatar: "/avatars/gamma.png" },
];
export const carriersData = [
  { id: "1", name: "Carrier Alpha", email: "alpha@example.com", phone: "555-111-2222", avatar: "/avatars/alpha.png" },
  { id: "2", name: "Carrier Beta", email: "beta@example.com", phone: "555-333-4444", avatar: "/avatars/beta.png" },
  { id: "3", name: "Carrier Gamma", email: "gamma@example.com", phone: "555-777-8888", avatar: "/avatars/gamma.png" },
];
export const sampleTenantOrders = {
  "1": [
    { id: "ORD-101", item: "W_idget A", qty: 120, status: "Shipped" },
    { id: "ORD-102", item: "W_idget B", qty: 50, status: "Pending" },
  ],
  "2": [
    { id: "ORD-201", item: "Gadget X", qty: 200, status: "Delivered" },
  ],
  "3": [
    { id: "ORD-301", item: "Part Z", qty: 75, status: "Shipped" },
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
    id: "1",
    name: "Stepper Motor NEMA 17",
    description: "High-torque stepper motor suitable for 3D printers and CNC machines.",
    sku: "MTR-001",
    stock: 120,
    price: 14.99,
    manufacturer: { _id: "1", name: "Manufacturer Alpha" },
    image: "/motor.jpg",
    status: "In Stock",
    isAssemblable: true,
    isSellable: false,
    isPurchasable: true,
    owner: "Delightloop Inc.",
    isVirtual: false
  },
  {
    id: "2",
    name: "Arduino Uno R3",
    description: "Popular microcontroller board based on the ATmega328P.",
    category: { _id: "cylinder_parts", name: "Cylinder Parts" },
    sku: "MCU-002",
    stock: 15,
    price: 22.50,
    manufacturer: { _id: "2", name: "Manufacturer Beta" },
    image: "/arduino.jpg",
    status: "Low Stock",
    isAssemblable: true,
    isSellable: true,
    isPurchasable: true,

    isVirtual: false
  },
  {
    id: "3",
    name: "L298N Motor Driver",
    description: "Dual H-Bridge motor driver module for controlling DC motors and stepper motors.",

    sku: "DRV-003",
    stock: 0,
    price: 9.90,
    image: "/driver.jpg",
    status: "Out of Stock",
    isAssemblable: false,
    isSellable: false,
    isPurchasable: true,

    isVirtual: false

  },
]
export const partsLocation: PartLocation[] = [
  {
    id: "abce",
    name: "US-HTX-Ergode",
    quantity: 120,
    reserved: 5,
    subLocations: [
      { id: "abce1", name: "Aisle 1, Shelf B", quantity: 50, reserved: 5 },
      { id: "abce2", name: "Aisle 3, Shelf A", quantity: 30 },
      { id: "abce3", name: "Aisle 5, Shelf C", quantity: 40 },
    ]
  },
  {
    id: "abcf",
    name: "US-HTX-Reserve",
    quantity: 20,
    reserved: 2,
    subLocations: [
      { id: "abcf1", name: "Backroom Shelf 1", quantity: 15 },
      { id: "abcf3", name: "Backroom Shelf 2", quantity: 5, reserved: 2 },
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
    BOM: [
      { id: "part-esp32", name: "ESP32-WROOM Module", sku: "MTR-ESP32", qtyPerProduct: 1, linkType: "Assembly", stock: 120, partType: "part" },
      { id: "part-usb", name: "USB Cable", sku: "CAB-USB-A-B", qtyPerProduct: 1, linkType: "Content", stock: 150, partType: "product" },
      { id: "part-sensor", name: "DHT22 Sensor", sku: "SNS-DHT22", qtyPerProduct: 1, linkType: "Content", stock: 150, partType: "part" },
      { id: "part-box", name: "Package Box", sku: "BOX-002", qtyPerProduct: 1, linkType: "Packaging", stock: 300, partType: "part" },
      { id: "part-S649", name: "Shipping Box", sku: "CAB-USB-A-B", qtyPerProduct: 1, linkType: "Shipping", stock: 500, partType: "product" },
    ],
    manufacturer: { _id: "1", name: "Manufacturer Alpha" }
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
    BOM: [
      { id: "part-motor", name: "Stepper Motor NEMA 17", sku: "MTR-001", qtyPerProduct: 2, linkType: "Content", stock: 120, partType: "product" },
      { id: "part-driver", name: "Motor Driver L298N", sku: "DRV-003", qtyPerProduct: 1, linkType: "Assembly", stock: 150, partType: "product" },
      { id: "part-box", name: "Package Box", sku: "BOX-002", qtyPerProduct: 1, linkType: "Packaging", stock: 300, partType: "product" },
      { id: "part-S649", name: "Shipping Box", sku: "CAB-USB-A-B", qtyPerProduct: 1, linkType: "Shipping", stock: 500, partType: "product" },
    ],
    manufacturer: { _id: "2", name: "Manufacturer Beta" }
  },
];
export const productTypes: SelectData[] = [
  { id: "digital", name: "Digital/Virtual" },
  { id: "physical", name: "Physical" },
  { id: "service", name: "Service" }
]
export const sampleLocations: Location[] = [
  { id: "loc1", name: "US-HTX-Ergode", description: "Main warehouse in Houston, TX", category: "Warehouse", sku: "WH-HTX", status: "Active" },
  { id: "loc2", name: "US-HTX-Reserve", description: "Reserve stock area in Houston, TX", category: "Warehouse", sku: "WH-HTX-RSV", status: "Active" },
  { id: "loc3", name: "US-HTX-Solon", description: "Overflow storage in Solon, OH", category: "Warehouse", sku: "WH-SOL", status: "Active", processOrders: true },
];

export const PartCategories: SelectData[] = [
  {
    id: "auto",
    name: "Automotive Parts",
    children: [
      {
        id: "engine",
        name: "Engine Components",
        children: [
          {
            id: "cylinder_parts",
            name: "Cylinder Parts",
            children: [
              { id: "piston_rings", name: "Piston Rings", children: [] },
              { id: "piston_pins", name: "Piston Pins", children: [] }
            ]
          },
          { id: "gaskets", name: "Gaskets", children: [] }
        ]
      },
      {
        id: "cooling_system",
        name: "Cooling System",
        children: [
          { id: "radiators", name: "Radiators", children: [] },
          { id: "water_pumps", name: "Water Pumps", children: [] }
        ]
      },
      {
        id: "brake_system",
        name: "Braking System",
        children: [
          { id: "pads_rotors", name: "Pads and Rotors", children: [] },
          { id: "calipers", name: "Calipers", children: [] },
          { id: "master_cylinders", name: "Master Cylinders", children: [] }
        ]
      },
      {
        id: "electrical",
        name: "Electrical System",
        children: [
          { id: "batteries", name: "Batteries", children: [] },
          { id: "starters", name: "Starters", children: [] },
          { id: "alternators", name: "Alternators", children: [] }
        ]
      },
      {
        id: "suspension",
        name: "Suspension and Steering",
        children: [
          { id: "shock_absorbers", name: "Shock Absorbers", children: [] },
          { id: "control_arms", name: "Control Arms", children: [] },
          { id: "tie_rods", name: "Tie Rods", children: [] }
        ]
      },
      {
        id: "exhaust",
        name: "Exhaust System",
        children: [
          { id: "mufflers", name: "Mufflers", children: [] },
          { id: "catalytic_converters", name: "Catalytic Converters", children: [] }
        ]
      }
    ]
  },
  {
    id: "electronics",
    name: "Electronic Components",
    children: [
      {
        id: "passive",
        name: "Passive Components",
        children: [
          {
            id: "resistors",
            name: "Resistors",
            children: [
              { id: "fixed_resistors", name: "Fixed Resistors", children: [] },
              { id: "variable_resistors", name: "Variable Resistors", children: [] }
            ]
          },
          {
            id: "capacitors",
            name: "Capacitors",
            children: [
              { id: "ceramic_capacitors", name: "Ceramic Capacitors", children: [] },
              { id: "electrolytic_capacitors", name: "Electrolytic Capacitors", children: [] }
            ]
          },
          {
            id: "inductors",
            name: "Inductors",
            children: [
              { id: "chokes", name: "Chokes", children: [] }
            ]
          }
        ]
      },
      {
        id: "active",
        name: "Active Components",
        children: [
          {
            id: "semiconductors",
            name: "Semiconductors",
            children: [
              { id: "diodes", name: "Diodes", children: [] },
              { id: "transistors", name: "Transistors", children: [] }
            ]
          },
          {
            id: "ics",
            name: "Integrated Circuits (ICs)",
            children: [
              { id: "processors", name: "Microprocessors", children: [] },
              { id: "memory", name: "Memory Chips", children: [] }
            ]
          }
        ]
      },
      {
        id: "electromechanical",
        name: "Electromechanical Components",
        children: [
          { id: "connectors", name: "Connectors", children: [] },
          { id: "switches", name: "Switches", children: [] },
          { id: "relays", name: "Relays", children: [] }
        ]
      }
    ]
  },
  {
    id: "home_appliances",
    name: "Home Appliance Parts",
    children: [
      {
        id: "kitchen_appliances",
        name: "Kitchen Appliance Parts",
        children: [
          {
            id: "refrigeration",
            name: "Refrigeration Parts",
            children: [
              { id: "compressors", name: "Compressors", children: [] },
              { id: "thermostats", name: "Thermostats", children: [] }
            ]
          },
          {
            id: "cooking",
            name: "Cooking Appliance Parts",
            children: [
              { id: "heating_elements", name: "Heating Elements", children: [] },
              { id: "igniters", name: "Igniters", children: [] }
            ]
          }
        ]
      },
      {
        id: "laundry_appliances",
        name: "Laundry Appliance Parts",
        children: [
          {
            id: "washer_parts",
            name: "Washer Parts",
            children: [
              { id: "drive_belts", name: "Drive Belts", children: [] },
              { id: "pumps", name: "Pumps", children: [] }
            ]
          },
          {
            id: "dryer_parts",
            name: "Dryer Parts",
            children: [
              { id: "heating_elements_dryer", name: "Heating Elements", children: [] },
              { id: "rollers", name: "Drum Rollers", children: [] }
            ]
          }
        ]
      },
      {
        id: "hvac",
        name: "HVAC and Air Care Parts",
        children: [
          {
            id: "air_conditioning_parts",
            name: "Air Conditioning Parts",
            children: [
              { id: "blower_motors", name: "Blower Motors", children: [] },
              { id: "capacitors_hvac", name: "Capacitors", children: [] }
            ]
          }
        ]
      }
    ]
  }
]

export const productCategories: SelectData[] = [
  {
    id: "1",
    name: "Electronics",
    children: [
      {
        id: "101",
        name: "Computers & Accessories",
        children: [
          { id: "10101", name: "Laptops" },
          { id: "10102", name: "Desktops" },
          { id: "10103", name: "Monitors" },
          { id: "10104", name: "Keyboards" },
          { id: "10105", name: "Mice" },
          { id: "10106", name: "Printers" },
          { id: "10107", name: "Computer Components" },
          { id: "10108", name: "Networking Devices" },
          { id: "10109", name: "Software" },
        ]
      },
      {
        id: "102",
        name: "Smartphones & Accessories",
        children: [
          { id: "10201", name: "Smartphones" },
          { id: "10202", name: "Tablets" },
          { id: "10203", name: "Phone Cases" },
          { id: "10204", name: "Screen Protectors" },
          { id: "10205", name: "Chargers & Cables" },
          { id: "10206", name: "Power Banks" },
          { id: "10207", name: "Headphones & Earbuds" },
        ]
      },
      {
        id: "103",
        name: "TV & Home Theater",
        children: [
          { id: "10301", name: "Televisions" },
          { id: "10302", name: "Home Theater Systems" },
          { id: "10303", name: "Streaming Devices" },
          { id: "10304", name: "TV Mounts & Stands" },
          { id: "10305", name: "Projectors" },
          { id: "10306", name: "Speakers" },
        ]
      },
      {
        id: "104",
        name: "Cameras & Photography",
        children: [
          { id: "10401", name: "Digital Cameras" },
          { id: "10402", name: "DSLR Cameras" },
          { id: "10403", name: "Lenses" },
          { id: "10404", name: "Camera Accessories" },
          { id: "10405", name: "Drones" },
          { id: "10406", name: "Action Cameras" },
        ]
      },
      {
        id: "105",
        name: "Audio & Headphones",
        children: [
          { id: "10501", name: "Headphones" },
          { id: "10502", name: "Earbuds" },
          { id: "10503", name: "Speakers" },
          { id: "10504", name: "Soundbars" },
          { id: "10505", name: "Microphones" },
          { id: "10506", name: "Audio Interfaces" },
        ]
      },
      {
        id: "106",
        name: "Wearable Technology",
        children: [
          { id: "10601", name: "Smartwatches" },
          { id: "10602", name: "Fitness Trackers" },
          { id: "10603", name: "VR Headsets" },
          { id: "10604", name: "Smart Glasses" },
        ]
      },
      {
        id: "107",
        name: "Gaming",
        children: [
          { id: "10701", name: "Gaming Consoles" },
          { id: "10702", name: "Video Games" },
          { id: "10703", name: "Gaming Accessories" },
          { id: "10704", name: "Gaming PCs" },
          { id: "10705", name: "Gaming Chairs" },
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Fashion",
    children: [
      {
        id: "201",
        name: "Men's Fashion",
        children: [
          { id: "20101", name: "Clothing" },
          { id: "20102", name: "Shoes" },
          { id: "20103", name: "Accessories" },
          { id: "20104", name: "Watches" },
          { id: "20105", name: "Jewelry" },
        ]
      },
      {
        id: "202",
        name: "Women's Fashion",
        children: [
          { id: "20201", name: "Clothing" },
          { id: "20202", name: "Shoes" },
          { id: "20203", name: "Accessories" },
          { id: "20204", name: "Handbags" },
          { id: "20205", name: "Jewelry" },
          { id: "20206", name: "Watches" },
        ]
      },
      {
        id: "203",
        name: "Kids' Fashion",
        children: [
          { id: "20301", name: "Boys' Clothing" },
          { id: "20302", name: "Girls' Clothing" },
          { id: "20303", name: "Kids' Shoes" },
          { id: "20304", name: "Baby Clothing" },
        ]
      }
    ]
  },
  {
    id: "3",
    name: "Home & Kitchen",
    children: [
      {
        id: "301",
        name: "Furniture",
        children: [
          { id: "30101", name: "Living Room Furniture" },
          { id: "30102", name: "Bedroom Furniture" },
          { id: "30103", name: "Kitchen & Dining Furniture" },
          { id: "30104", name: "Office Furniture" },
          { id: "30105", name: "Outdoor Furniture" },
        ]
      },
      {
        id: "302",
        name: "Kitchen & Dining",
        children: [
          { id: "30201", name: "Cookware" },
          { id: "30202", name: "Cutlery" },
          { id: "30203", name: "Small Appliances" },
          { id: "30204", name: "Tableware" },
          { id: "30205", name: "Kitchen Tools" },
        ]
      },
      {
        id: "303",
        name: "Home Décor",
        children: [
          { id: "30301", name: "Wall Art" },
          { id: "30302", name: "Lighting" },
          { id: "30303", name: "Rugs" },
          { id: "30304", name: "Curtains & Blinds" },
          { id: "30305", name: "Home Fragrance" },
        ]
      },
      {
        id: "304",
        name: "Bedding & Bath",
        children: [
          { id: "30401", name: "Bed Linens" },
          { id: "30402", name: "Bath Towels" },
          { id: "30403", name: "Pillows" },
          { id: "30404", name: "Comforters" },
        ]
      },
      {
        id: "305",
        name: "Home Improvement",
        children: [
          { id: "30501", name: "Tools" },
          { id: "30502", name: "Paint & Supplies" },
          { id: "30503", name: "Hardware" },
          { id: "30504", name: "Storage & Organization" },
        ]
      }
    ]
  },
  {
    id: "4",
    name: "Health & Beauty",
    children: [
      {
        id: "401",
        name: "Skincare",
        children: [
          { id: "40101", name: "Moisturizers" },
          { id: "40102", name: "Cleansers" },
          { id: "40103", name: "Serums & Treatments" },
          { id: "40104", name: "Sunscreen" },
          { id: "40105", name: "Face Masks" },
        ]
      },
      {
        id: "402",
        name: "Makeup",
        children: [
          { id: "40201", name: "Foundation" },
          { id: "40202", name: "Lipstick" },
          { id: "40203", name: "Eyeshadow" },
          { id: "40204", name: "Mascara" },
          { id: "40205", name: "Blush" },
        ]
      },
      {
        id: "403",
        name: "Hair Care",
        children: [
          { id: "40301", name: "Shampoo & Conditioner" },
          { id: "40302", name: "Hair Styling Products" },
          { id: "40303", name: "Hair Color" },
          { id: "40304", name: "Hair Accessories" },
        ]
      },
      {
        id: "404",
        name: "Fragrance",
        children: [
          { id: "40401", name: "Women's Perfume" },
          { id: "40402", name: "Men's Cologne" },
          { id: "40403", name: "Body Sprays" },
        ]
      },
      {
        id: "405",
        name: "Personal Care",
        children: [
          { id: "40501", name: "Oral Care" },
          { id: "40502", name: "Shaving & Hair Removal" },
          { id: "40503", name: "Deodorant" },
          { id: "40504", name: "Bath & Body" },
        ]
      }
    ]
  },
  {
    id: "5",
    name: "Sports & Outdoors",
    children: [
      {
        id: "501",
        name: "Exercise & Fitness",
        children: [
          { id: "50101", name: "Cardio Equipment" },
          { id: "50102", name: "Strength Training" },
          { id: "50103", name: "Yoga & Pilates" },
          { id: "50104", name: "Fitness Accessories" },
        ]
      },
      {
        id: "502",
        name: "Outdoor Recreation",
        children: [
          { id: "50201", name: "Camping & Hiking" },
          { id: "50202", name: "Cycling" },
          { id: "50203", name: "Water Sports" },
          { id: "50204", name: "Winter Sports" },
        ]
      },
      {
        id: "503",
        name: "Sports",
        children: [
          { id: "50301", name: "Team Sports" },
          { id: "50302", name: "Racquet Sports" },
          { id: "50303", name: "Golf" },
          { id: "50304", name: "Fishing" },
        ]
      },
      {
        id: "504",
        name: "Athletic Clothing & Shoes",
        children: [
          { id: "50401", name: "Men's Athletic Wear" },
          { id: "50402", name: "Women's Athletic Wear" },
          { id: "50403", name: "Athletic Shoes" },
          { id: "50404", name: "Sports Accessories" },
        ]
      }
    ]
  },
  {
    id: "6",
    name: "Toys & Games",
    children: [
      {
        id: "601",
        name: "Toys",
        children: [
          { id: "60101", name: "Action Figures" },
          { id: "60102", name: "Dolls & Accessories" },
          { id: "60103", name: "Building Sets" },
          { id: "60104", name: "Educational Toys" },
          { id: "60105", name: "Outdoor Toys" },
        ]
      },
      {
        id: "602",
        name: "Games",
        children: [
          { id: "60201", name: "Board Games" },
          { id: "60202", name: "Card Games" },
          { id: "60203", name: "Puzzles" },
          { id: "60204", name: "Video Games" },
        ]
      },
      {
        id: "603",
        name: "Baby & Toddler",
        children: [
          { id: "60301", name: "Baby Toys" },
          { id: "60302", name: "Stuffed Animals" },
          { id: "60303", name: "Play Vehicles" },
        ]
      }
    ]
  },
  {
    id: "7",
    name: "Automotive",
    children: [
      {
        id: "701",
        name: "Car Parts & Accessories",
        children: [
          { id: "70101", name: "Interior Accessories" },
          { id: "70102", name: "Exterior Accessories" },
          { id: "70103", name: "Performance Parts" },
          { id: "70104", name: "Replacement Parts" },
        ]
      },
      {
        id: "702",
        name: "Car Electronics",
        children: [
          { id: "70201", name: "Car Audio" },
          { id: "70202", name: "GPS & Navigation" },
          { id: "70203", name: "Car Security" },
          { id: "70204", name: "Dash Cams" },
        ]
      },
      {
        id: "703",
        name: "Motorcycle & Powersports",
        children: [
          { id: "70301", name: "Motorcycle Parts" },
          { id: "70302", name: "Motorcycle Gear" },
          { id: "70303", name: "ATV & UTV" },
        ]
      },
      {
        id: "704",
        name: "Tools & Equipment",
        children: [
          { id: "70401", name: "Repair Tools" },
          { id: "70402", name: "Diagnostic Tools" },
          { id: "70403", name: "Car Care" },
        ]
      }
    ]
  },
  {
    id: "8",
    name: "Books & Media",
    children: [
      {
        id: "801",
        name: "Books",
        children: [
          { id: "80101", name: "Fiction" },
          { id: "80102", name: "Non-Fiction" },
          { id: "80103", name: "Children's Books" },
          { id: "80104", name: "Textbooks" },
        ]
      },
      {
        id: "802",
        name: "Movies & TV",
        children: [
          { id: "80201", name: "DVDs & Blu-rays" },
          { id: "80202", name: "Digital Movies" },
        ]
      },
      {
        id: "803",
        name: "Music",
        children: [
          { id: "80301", name: "CDs" },
          { id: "80302", name: "Vinyl Records" },
          { id: "80303", name: "Digital Music" },
        ]
      },
      {
        id: "804",
        name: "Magazines & Newspapers",
        children: [
          { id: "80401", name: "Print Magazines" },
          { id: "80402", name: "Digital Magazines" },
        ]
      }
    ]
  }
];

export const bomItems: SelectData[] = [
  { id: "part-motor", name: "Stepper Motor NEMA 17", sku: "MTR-001", filterKey: "part" },
  { id: "part-driver", name: "Motor Driver L298N", sku: "DRV-003", filterKey: "part" },
  { id: "part-box", name: "Package Box", sku: "BOX-002", filterKey: "part" },
  { id: "part-S649", name: "Shipping Box", sku: "CAB-USB-A-B", filterKey: "part" },
  { id: "part-motor", name: "Stepper Motor NEMA 17", sku: "MTR-001", filterKey: "part" },
  { id: "part-driver", name: "Motor Driver L298N", sku: "DRV-003", filterKey: "part" },
  { id: "part-box", name: "Package Box", sku: "BOX-002", filterKey: "part" },
  { id: "part-S649", name: "Shipping Box", sku: "CAB-USB-A-B", filterKey: "part" },
  { id: "p2", name: "Robotics Kit - Beginner", sku: "PROD-ROBO-BEG", filterKey: "product" },
  { id: "p1", name: "ESP32 IoT Starter Kit", sku: "PROD-ESP32KIT", filterKey: "product" }
]

export const partsStock: StockOverview[] = [
  { id: "part-motor", name: "Stepper Motor NEMA 17", sku: "MTR-001", available: 2000, reserved: 20, type: "part" },
  { id: "part-driver", name: "Motor Driver L298N", sku: "DRV-003", available: 1500, reserved: 15, intransit: 1000, type: "part" },
  { id: "part-box1", name: "Package Box 1", sku: "BOX-001", available: 3000, reserved: 20, type: "part" },
  { id: "part-S649", name: "Shipping Box", sku: "CAB-USB-A-B", available: 5000, reserved: 55, type: "part" },
  { id: "part-box2", name: "Package Box 2", sku: "BOX-002", available: 2000, type: "part" },
  { id: "p2", name: "Robotics Kit - Beginner", sku: "PROD-ROBO-BEG", available: 50, reserved: 5, inproduction: 10, type: "product" },
  { id: "p1", name: "ESP32 IoT Starter Kit", sku: "PROD-ESP32KIT", available: 20, inproduction: 5, type: "product" },
  { id: "p3", name: "Poloriud Sunglasses", sku: "PROD-POLSUN", available: 0, intransit: 100, type: "product" }
]
export const lotsData: Lot[] = [
  {
    id: "lot-001",
    description: "Initial stock of stepper motors",
    part: { id: "part-motor", name: "Stepper Motor NEMA 17" },
    lotNumber: "LOT-2024-001",
    quantity: 500,
    receivedDate: new Date("2024-06-01"),
    expiryDate: new Date("2026-06-01"),
    status: "Available"
  },
  {
    id: "lot-002",
    part: { id: "part-driver", name: "Motor Driver L298N" },
    lotNumber: "LOT-2024-002",
    quantity: 300,
    receivedDate: new Date("2024-05-15"),
    expiryDate: new Date("2026-05-15"),
    status: "Available"
  },
  {
    id: "lot-003",
    part: { id: "part-box1", name: "Package Box 1" },
    lotNumber: "LOT-2024-003",
    quantity: 1000,
    receivedDate: new Date("2024-04-20"),
    expiryDate: new Date("2027-04-20"),
    status: "Available"
  },
  {
    id: "lot-004",
    part: { id: "part-S649", name: "Shipping Box" },
    lotNumber: "LOT-2024-004",
    quantity: 2000,
    receivedDate: new Date("2024-03-10"),
    expiryDate: new Date("2027-03-10"),
    status: "Available"
  },
  {
    id: "lot-005",
    part: { id: "part-box2", name: "Package Box 2" },
    lotNumber: "LOT-2024-005",
    quantity: 500,
    receivedDate: new Date("2024-02-05"),
    expiryDate: new Date("2027-02-05"),
    status: "Available"
  },
  {
    id: "lot-006",
    product: { id: "p2", name: "Robotics Kit - Beginner" },
    lotNumber: "LOT-2024-006",
    quantity: 20,
    receivedDate: new Date("2024-06-05"),
    expiryDate: new Date("2026-06-05"),
    status: "Available"
  },
  {
    id: "lot-007",
    product: { id: "p1", name: "ESP32 IoT Starter Kit" },
    lotNumber: "LOT-2024-007",
    quantity: 10,
    receivedDate: new Date("2024-06-10"),
    expiryDate: new Date("2026-06-10"),
    status: "Available"
  },
  {
    id: "lot-008",
    product: { id: "p3", name: "Poloriud Sunglasses" },
    lotNumber: "LOT-2024-008",
    quantity: 100,
    receivedDate: new Date("2024-05-01"),
    expiryDate: new Date("2026-05-01"),
    status: "Quarantined"
  }
]
export const lotHistories: LotHistory[] = [
  {
    id: "history-001",
    lot_id: "lot-001",
    action: "Received",
    date: new Date("2024-06-01"),
    qtyChange: 500,
    user: "John Doe"
  },
  {
    id: "history-002",
    lot_id: "lot-001",
    action: "Inspected",
    date: new Date("2024-06-02"),
    qtyChange: 0,
    user: "Jane Smith"
  },
  {
    id: "history-003",
    lot_id: "lot-001",
    action: "Moved to Storage",
    date: new Date("2024-06-03"),
    qtyChange: 500, user: "Emily Johnson"
  },
  {
    id: "history-004",
    lot_id: "lot-002",
    action: "Received",
    date: new Date("2024-05-15"),
    qtyChange: 300,
    user: "John Doe"
  },
  {
    id: "history-005",
    lot_id: "lot-002",
    action: "Inspected",
    date: new Date("2024-05-16"),
    qtyChange: 0,
    user: "Jane Smith"
  },
  {
    id: "history-006",
    lot_id: "lot-002",
    action: "Moved to Storage",
    date: new Date("2024-05-17"),
    qtyChange: 300,
    user: "Emily Johnson"
  },
  {
    id: "history-007",
    lot_id: "lot-003",
    action: "Received",
    date: new Date("2024-04-20"),
    qtyChange: 1000,
    user: "John Doe"
  },
  {
    id: "history-008",
    lot_id: "lot-003",
    action: "Inspected",
    date: new Date("2024-04-21"),
    qtyChange: 0,
    user: "Jane Smith"
  },
  {
    id: "history-009",
    lot_id: "lot-003",
    action: "Moved to Storage",
    date: new Date("2024-04-22"),
    qtyChange: 1000,
    user: "Emily Johnson"
  }

];
export const orders: Order[] = [
  {
    id: "ORD-1001",
    customer: "John Doe",
    date: "2025-09-20",
    items: 3,
    status: "picking",
    location: {id: "loc3", name: "US-HTX-Solon"},
    itemsList: [
      { _id: "p1", sku: "PROD-ESP32KIT", name: "ESP32 IoT Starter Kit" , qty: 1 },
      { _id: "p2", sku: "PROD-ROBO-BEG", name: "Robotics Kit - Beginner", qty: 2 }
    ]
  },
  {
    id: "ORD-1002",
    customer: "Acme Corp",
    date: "2025-09-21",
    items: 5,
    status: "shipped",
    location: {id: "loc3", name: "US-HTX-Solon"},
    tracking: "1Z984...",
        itemsList: [
      { _id: "p1", sku: "PROD-ESP32KIT", name: "ESP32 IoT Starter Kit" , qty: 2 },
      { _id: "p2", sku: "PROD-ROBO-BEG", name: "Robotics Kit - Beginner", qty: 3 }
    ]
  },
  {
    id: "ORD-1003",
    customer: "Jane Smith",
    date: "2025-09-22",
    items: 2,
    status: "pending",
    location: {id: "loc3", name: "US-HTX-Solon"},
    itemsList: [
      { _id: "p1", sku: "PROD-ESP32KIT", name: "ESP32 IoT Starter Kit" , qty: 1 },
      { _id: "p2", sku: "PROD-ROBO-BEG", name: "Robotics Kit - Beginner", qty: 1 }
    ]
  }
];