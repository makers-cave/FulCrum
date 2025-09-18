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
import { Customer, Part, PartLocation, Product, SelectData, StockOverview, Tenant, WarehouseLocation } from "./types";
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
    _id: "2",
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
    _id: "3",
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
  {
    _id: "abcf",
    name: "US-HTX-Reserve",
    quantity: 20,
    reserved: 2,
    subLocations: [
      { _id: "abcf1", name: "Backroom Shelf 1", quantity: 15 },
      { _id: "abcf3", name: "Backroom Shelf 2", quantity: 5, reserved: 2 },
    ]
  }
]

export const productsData: Product[] = [
  {
    _id: "p1",
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
      { _id: "part-esp32", name: "ESP32-WROOM Module", sku: "MTR-ESP32", qtyPerProduct: 1, linkType: "Assembly", stock: 120, partType: "part" },
      { _id: "part-usb", name: "USB Cable", sku: "CAB-USB-A-B", qtyPerProduct: 1, linkType: "Content", stock: 150, partType: "product" },
      { _id: "part-sensor", name: "DHT22 Sensor", sku: "SNS-DHT22", qtyPerProduct: 1, linkType: "Content", stock: 150, partType: "part" },
      { _id: "part-box", name: "Package Box", sku: "BOX-002", qtyPerProduct: 1, linkType: "Packaging", stock: 300, partType: "part" },
      { _id: "part-S649", name: "Shipping Box", sku: "CAB-USB-A-B", qtyPerProduct: 1, linkType: "Shipping", stock: 500, partType: "product" },
    ],
    manufacturer: { _id: "1", name: "Manufacturer Alpha" }
  },
  {
    _id: "p2",
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
      { _id: "part-motor", name: "Stepper Motor NEMA 17", sku: "MTR-001", qtyPerProduct: 2, linkType: "Content", stock: 120, partType: "product" },
      { _id: "part-driver", name: "Motor Driver L298N", sku: "DRV-003", qtyPerProduct: 1, linkType: "Assembly", stock: 150, partType: "product" },
      { _id: "part-box", name: "Package Box", sku: "BOX-002", qtyPerProduct: 1, linkType: "Packaging", stock: 300, partType: "product" },
      { _id: "part-S649", name: "Shipping Box", sku: "CAB-USB-A-B", qtyPerProduct: 1, linkType: "Shipping", stock: 500, partType: "product" },
    ],
    manufacturer: { _id: "2", name: "Manufacturer Beta" }
  },
];
export const productTypes: SelectData[] = [
  { _id: "digital", name: "Digital/Virtual" },
  { _id: "physical", name: "Physical" },
  { _id: "service", name: "Service" }
]
export const sampleLocations: WarehouseLocation[] = [
  { _id: "loc1", name: "US-HTX-Ergode", description: "Main warehouse in Houston, TX", category: "Warehouse", sku: "WH-HTX", status: "Active" },
  { _id: "loc2", name: "US-HTX-Reserve", description: "Reserve stock area in Houston, TX", category: "Warehouse", sku: "WH-HTX-RSV", status: "Active" },
  { _id: "loc3", name: "US-HTX-Solon", description: "Overflow storage in Solon, OH", category: "Warehouse", sku: "WH-SOL", status: "Inactive" },
];

export const PartCategories: SelectData[] = [
  {
    _id: "auto",
    name: "Automotive Parts",
    children: [
      {
        _id: "engine",
        name: "Engine Components",
        children: [
          {
            _id: "cylinder_parts",
            name: "Cylinder Parts",
            children: [
              { _id: "piston_rings", name: "Piston Rings", children: [] },
              { _id: "piston_pins", name: "Piston Pins", children: [] }
            ]
          },
          { _id: "gaskets", name: "Gaskets", children: [] }
        ]
      },
      {
        _id: "cooling_system",
        name: "Cooling System",
        children: [
          { _id: "radiators", name: "Radiators", children: [] },
          { _id: "water_pumps", name: "Water Pumps", children: [] }
        ]
      },
      {
        _id: "brake_system",
        name: "Braking System",
        children: [
          { _id: "pads_rotors", name: "Pads and Rotors", children: [] },
          { _id: "calipers", name: "Calipers", children: [] },
          { _id: "master_cylinders", name: "Master Cylinders", children: [] }
        ]
      },
      {
        _id: "electrical",
        name: "Electrical System",
        children: [
          { _id: "batteries", name: "Batteries", children: [] },
          { _id: "starters", name: "Starters", children: [] },
          { _id: "alternators", name: "Alternators", children: [] }
        ]
      },
      {
        _id: "suspension",
        name: "Suspension and Steering",
        children: [
          { _id: "shock_absorbers", name: "Shock Absorbers", children: [] },
          { _id: "control_arms", name: "Control Arms", children: [] },
          { _id: "tie_rods", name: "Tie Rods", children: [] }
        ]
      },
      {
        _id: "exhaust",
        name: "Exhaust System",
        children: [
          { _id: "mufflers", name: "Mufflers", children: [] },
          { _id: "catalytic_converters", name: "Catalytic Converters", children: [] }
        ]
      }
    ]
  },
  {
    _id: "electronics",
    name: "Electronic Components",
    children: [
      {
        _id: "passive",
        name: "Passive Components",
        children: [
          {
            _id: "resistors",
            name: "Resistors",
            children: [
              { _id: "fixed_resistors", name: "Fixed Resistors", children: [] },
              { _id: "variable_resistors", name: "Variable Resistors", children: [] }
            ]
          },
          {
            _id: "capacitors",
            name: "Capacitors",
            children: [
              { _id: "ceramic_capacitors", name: "Ceramic Capacitors", children: [] },
              { _id: "electrolytic_capacitors", name: "Electrolytic Capacitors", children: [] }
            ]
          },
          {
            _id: "inductors",
            name: "Inductors",
            children: [
              { _id: "chokes", name: "Chokes", children: [] }
            ]
          }
        ]
      },
      {
        _id: "active",
        name: "Active Components",
        children: [
          {
            _id: "semiconductors",
            name: "Semiconductors",
            children: [
              { _id: "diodes", name: "Diodes", children: [] },
              { _id: "transistors", name: "Transistors", children: [] }
            ]
          },
          {
            _id: "ics",
            name: "Integrated Circuits (ICs)",
            children: [
              { _id: "processors", name: "Microprocessors", children: [] },
              { _id: "memory", name: "Memory Chips", children: [] }
            ]
          }
        ]
      },
      {
        _id: "electromechanical",
        name: "Electromechanical Components",
        children: [
          { _id: "connectors", name: "Connectors", children: [] },
          { _id: "switches", name: "Switches", children: [] },
          { _id: "relays", name: "Relays", children: [] }
        ]
      }
    ]
  },
  {
    _id: "home_appliances",
    name: "Home Appliance Parts",
    children: [
      {
        _id: "kitchen_appliances",
        name: "Kitchen Appliance Parts",
        children: [
          {
            _id: "refrigeration",
            name: "Refrigeration Parts",
            children: [
              { _id: "compressors", name: "Compressors", children: [] },
              { _id: "thermostats", name: "Thermostats", children: [] }
            ]
          },
          {
            _id: "cooking",
            name: "Cooking Appliance Parts",
            children: [
              { _id: "heating_elements", name: "Heating Elements", children: [] },
              { _id: "igniters", name: "Igniters", children: [] }
            ]
          }
        ]
      },
      {
        _id: "laundry_appliances",
        name: "Laundry Appliance Parts",
        children: [
          {
            _id: "washer_parts",
            name: "Washer Parts",
            children: [
              { _id: "drive_belts", name: "Drive Belts", children: [] },
              { _id: "pumps", name: "Pumps", children: [] }
            ]
          },
          {
            _id: "dryer_parts",
            name: "Dryer Parts",
            children: [
              { _id: "heating_elements_dryer", name: "Heating Elements", children: [] },
              { _id: "rollers", name: "Drum Rollers", children: [] }
            ]
          }
        ]
      },
      {
        _id: "hvac",
        name: "HVAC and Air Care Parts",
        children: [
          {
            _id: "air_conditioning_parts",
            name: "Air Conditioning Parts",
            children: [
              { _id: "blower_motors", name: "Blower Motors", children: [] },
              { _id: "capacitors_hvac", name: "Capacitors", children: [] }
            ]
          }
        ]
      }
    ]
  }
]

export const productCategories: SelectData[] = [
  {
    _id: "1",
    name: "Electronics",
    children: [
      {
        _id: "101",
        name: "Computers & Accessories",
        children: [
          { _id: "10101", name: "Laptops" },
          { _id: "10102", name: "Desktops" },
          { _id: "10103", name: "Monitors" },
          { _id: "10104", name: "Keyboards" },
          { _id: "10105", name: "Mice" },
          { _id: "10106", name: "Printers" },
          { _id: "10107", name: "Computer Components" },
          { _id: "10108", name: "Networking Devices" },
          { _id: "10109", name: "Software" },
        ]
      },
      {
        _id: "102",
        name: "Smartphones & Accessories",
        children: [
          { _id: "10201", name: "Smartphones" },
          { _id: "10202", name: "Tablets" },
          { _id: "10203", name: "Phone Cases" },
          { _id: "10204", name: "Screen Protectors" },
          { _id: "10205", name: "Chargers & Cables" },
          { _id: "10206", name: "Power Banks" },
          { _id: "10207", name: "Headphones & Earbuds" },
        ]
      },
      {
        _id: "103",
        name: "TV & Home Theater",
        children: [
          { _id: "10301", name: "Televisions" },
          { _id: "10302", name: "Home Theater Systems" },
          { _id: "10303", name: "Streaming Devices" },
          { _id: "10304", name: "TV Mounts & Stands" },
          { _id: "10305", name: "Projectors" },
          { _id: "10306", name: "Speakers" },
        ]
      },
      {
        _id: "104",
        name: "Cameras & Photography",
        children: [
          { _id: "10401", name: "Digital Cameras" },
          { _id: "10402", name: "DSLR Cameras" },
          { _id: "10403", name: "Lenses" },
          { _id: "10404", name: "Camera Accessories" },
          { _id: "10405", name: "Drones" },
          { _id: "10406", name: "Action Cameras" },
        ]
      },
      {
        _id: "105",
        name: "Audio & Headphones",
        children: [
          { _id: "10501", name: "Headphones" },
          { _id: "10502", name: "Earbuds" },
          { _id: "10503", name: "Speakers" },
          { _id: "10504", name: "Soundbars" },
          { _id: "10505", name: "Microphones" },
          { _id: "10506", name: "Audio Interfaces" },
        ]
      },
      {
        _id: "106",
        name: "Wearable Technology",
        children: [
          { _id: "10601", name: "Smartwatches" },
          { _id: "10602", name: "Fitness Trackers" },
          { _id: "10603", name: "VR Headsets" },
          { _id: "10604", name: "Smart Glasses" },
        ]
      },
      {
        _id: "107",
        name: "Gaming",
        children: [
          { _id: "10701", name: "Gaming Consoles" },
          { _id: "10702", name: "Video Games" },
          { _id: "10703", name: "Gaming Accessories" },
          { _id: "10704", name: "Gaming PCs" },
          { _id: "10705", name: "Gaming Chairs" },
        ]
      }
    ]
  },
  {
    _id: "2",
    name: "Fashion",
    children: [
      {
        _id: "201",
        name: "Men's Fashion",
        children: [
          { _id: "20101", name: "Clothing" },
          { _id: "20102", name: "Shoes" },
          { _id: "20103", name: "Accessories" },
          { _id: "20104", name: "Watches" },
          { _id: "20105", name: "Jewelry" },
        ]
      },
      {
        _id: "202",
        name: "Women's Fashion",
        children: [
          { _id: "20201", name: "Clothing" },
          { _id: "20202", name: "Shoes" },
          { _id: "20203", name: "Accessories" },
          { _id: "20204", name: "Handbags" },
          { _id: "20205", name: "Jewelry" },
          { _id: "20206", name: "Watches" },
        ]
      },
      {
        _id: "203",
        name: "Kids' Fashion",
        children: [
          { _id: "20301", name: "Boys' Clothing" },
          { _id: "20302", name: "Girls' Clothing" },
          { _id: "20303", name: "Kids' Shoes" },
          { _id: "20304", name: "Baby Clothing" },
        ]
      }
    ]
  },
  {
    _id: "3",
    name: "Home & Kitchen",
    children: [
      {
        _id: "301",
        name: "Furniture",
        children: [
          { _id: "30101", name: "Living Room Furniture" },
          { _id: "30102", name: "Bedroom Furniture" },
          { _id: "30103", name: "Kitchen & Dining Furniture" },
          { _id: "30104", name: "Office Furniture" },
          { _id: "30105", name: "Outdoor Furniture" },
        ]
      },
      {
        _id: "302",
        name: "Kitchen & Dining",
        children: [
          { _id: "30201", name: "Cookware" },
          { _id: "30202", name: "Cutlery" },
          { _id: "30203", name: "Small Appliances" },
          { _id: "30204", name: "Tableware" },
          { _id: "30205", name: "Kitchen Tools" },
        ]
      },
      {
        _id: "303",
        name: "Home Décor",
        children: [
          { _id: "30301", name: "Wall Art" },
          { _id: "30302", name: "Lighting" },
          { _id: "30303", name: "Rugs" },
          { _id: "30304", name: "Curtains & Blinds" },
          { _id: "30305", name: "Home Fragrance" },
        ]
      },
      {
        _id: "304",
        name: "Bedding & Bath",
        children: [
          { _id: "30401", name: "Bed Linens" },
          { _id: "30402", name: "Bath Towels" },
          { _id: "30403", name: "Pillows" },
          { _id: "30404", name: "Comforters" },
        ]
      },
      {
        _id: "305",
        name: "Home Improvement",
        children: [
          { _id: "30501", name: "Tools" },
          { _id: "30502", name: "Paint & Supplies" },
          { _id: "30503", name: "Hardware" },
          { _id: "30504", name: "Storage & Organization" },
        ]
      }
    ]
  },
  {
    _id: "4",
    name: "Health & Beauty",
    children: [
      {
        _id: "401",
        name: "Skincare",
        children: [
          { _id: "40101", name: "Moisturizers" },
          { _id: "40102", name: "Cleansers" },
          { _id: "40103", name: "Serums & Treatments" },
          { _id: "40104", name: "Sunscreen" },
          { _id: "40105", name: "Face Masks" },
        ]
      },
      {
        _id: "402",
        name: "Makeup",
        children: [
          { _id: "40201", name: "Foundation" },
          { _id: "40202", name: "Lipstick" },
          { _id: "40203", name: "Eyeshadow" },
          { _id: "40204", name: "Mascara" },
          { _id: "40205", name: "Blush" },
        ]
      },
      {
        _id: "403",
        name: "Hair Care",
        children: [
          { _id: "40301", name: "Shampoo & Conditioner" },
          { _id: "40302", name: "Hair Styling Products" },
          { _id: "40303", name: "Hair Color" },
          { _id: "40304", name: "Hair Accessories" },
        ]
      },
      {
        _id: "404",
        name: "Fragrance",
        children: [
          { _id: "40401", name: "Women's Perfume" },
          { _id: "40402", name: "Men's Cologne" },
          { _id: "40403", name: "Body Sprays" },
        ]
      },
      {
        _id: "405",
        name: "Personal Care",
        children: [
          { _id: "40501", name: "Oral Care" },
          { _id: "40502", name: "Shaving & Hair Removal" },
          { _id: "40503", name: "Deodorant" },
          { _id: "40504", name: "Bath & Body" },
        ]
      }
    ]
  },
  {
    _id: "5",
    name: "Sports & Outdoors",
    children: [
      {
        _id: "501",
        name: "Exercise & Fitness",
        children: [
          { _id: "50101", name: "Cardio Equipment" },
          { _id: "50102", name: "Strength Training" },
          { _id: "50103", name: "Yoga & Pilates" },
          { _id: "50104", name: "Fitness Accessories" },
        ]
      },
      {
        _id: "502",
        name: "Outdoor Recreation",
        children: [
          { _id: "50201", name: "Camping & Hiking" },
          { _id: "50202", name: "Cycling" },
          { _id: "50203", name: "Water Sports" },
          { _id: "50204", name: "Winter Sports" },
        ]
      },
      {
        _id: "503",
        name: "Sports",
        children: [
          { _id: "50301", name: "Team Sports" },
          { _id: "50302", name: "Racquet Sports" },
          { _id: "50303", name: "Golf" },
          { _id: "50304", name: "Fishing" },
        ]
      },
      {
        _id: "504",
        name: "Athletic Clothing & Shoes",
        children: [
          { _id: "50401", name: "Men's Athletic Wear" },
          { _id: "50402", name: "Women's Athletic Wear" },
          { _id: "50403", name: "Athletic Shoes" },
          { _id: "50404", name: "Sports Accessories" },
        ]
      }
    ]
  },
  {
    _id: "6",
    name: "Toys & Games",
    children: [
      {
        _id: "601",
        name: "Toys",
        children: [
          { _id: "60101", name: "Action Figures" },
          { _id: "60102", name: "Dolls & Accessories" },
          { _id: "60103", name: "Building Sets" },
          { _id: "60104", name: "Educational Toys" },
          { _id: "60105", name: "Outdoor Toys" },
        ]
      },
      {
        _id: "602",
        name: "Games",
        children: [
          { _id: "60201", name: "Board Games" },
          { _id: "60202", name: "Card Games" },
          { _id: "60203", name: "Puzzles" },
          { _id: "60204", name: "Video Games" },
        ]
      },
      {
        _id: "603",
        name: "Baby & Toddler",
        children: [
          { _id: "60301", name: "Baby Toys" },
          { _id: "60302", name: "Stuffed Animals" },
          { _id: "60303", name: "Play Vehicles" },
        ]
      }
    ]
  },
  {
    _id: "7",
    name: "Automotive",
    children: [
      {
        _id: "701",
        name: "Car Parts & Accessories",
        children: [
          { _id: "70101", name: "Interior Accessories" },
          { _id: "70102", name: "Exterior Accessories" },
          { _id: "70103", name: "Performance Parts" },
          { _id: "70104", name: "Replacement Parts" },
        ]
      },
      {
        _id: "702",
        name: "Car Electronics",
        children: [
          { _id: "70201", name: "Car Audio" },
          { _id: "70202", name: "GPS & Navigation" },
          { _id: "70203", name: "Car Security" },
          { _id: "70204", name: "Dash Cams" },
        ]
      },
      {
        _id: "703",
        name: "Motorcycle & Powersports",
        children: [
          { _id: "70301", name: "Motorcycle Parts" },
          { _id: "70302", name: "Motorcycle Gear" },
          { _id: "70303", name: "ATV & UTV" },
        ]
      },
      {
        _id: "704",
        name: "Tools & Equipment",
        children: [
          { _id: "70401", name: "Repair Tools" },
          { _id: "70402", name: "Diagnostic Tools" },
          { _id: "70403", name: "Car Care" },
        ]
      }
    ]
  },
  {
    _id: "8",
    name: "Books & Media",
    children: [
      {
        _id: "801",
        name: "Books",
        children: [
          { _id: "80101", name: "Fiction" },
          { _id: "80102", name: "Non-Fiction" },
          { _id: "80103", name: "Children's Books" },
          { _id: "80104", name: "Textbooks" },
        ]
      },
      {
        _id: "802",
        name: "Movies & TV",
        children: [
          { _id: "80201", name: "DVDs & Blu-rays" },
          { _id: "80202", name: "Digital Movies" },
        ]
      },
      {
        _id: "803",
        name: "Music",
        children: [
          { _id: "80301", name: "CDs" },
          { _id: "80302", name: "Vinyl Records" },
          { _id: "80303", name: "Digital Music" },
        ]
      },
      {
        _id: "804",
        name: "Magazines & Newspapers",
        children: [
          { _id: "80401", name: "Print Magazines" },
          { _id: "80402", name: "Digital Magazines" },
        ]
      }
    ]
  }
];

export const bomItems: SelectData[] = [
  { _id: "part-motor", name: "Stepper Motor NEMA 17", sku: "MTR-001", filterKey: "part" },
  { _id: "part-driver", name: "Motor Driver L298N", sku: "DRV-003", filterKey: "part" },
  { _id: "part-box", name: "Package Box", sku: "BOX-002", filterKey: "part" },
  { _id: "part-S649", name: "Shipping Box", sku: "CAB-USB-A-B", filterKey: "part" },
  { _id: "part-motor", name: "Stepper Motor NEMA 17", sku: "MTR-001", filterKey: "part" },
  { _id: "part-driver", name: "Motor Driver L298N", sku: "DRV-003", filterKey: "part" },
  { _id: "part-box", name: "Package Box", sku: "BOX-002", filterKey: "part" },
  { _id: "part-S649", name: "Shipping Box", sku: "CAB-USB-A-B", filterKey: "part" },
  { _id: "p2", name: "Robotics Kit - Beginner", sku: "PROD-ROBO-BEG", filterKey: "product" },
  { _id: "p1", name: "ESP32 IoT Starter Kit", sku: "PROD-ESP32KIT", filterKey: "product" }
]

export const partsStock: StockOverview[] = [
  { _id: "part-motor", name: "Stepper Motor NEMA 17", sku: "MTR-001", available: 2000, reserved: 20 },
  { _id: "part-driver", name: "Motor Driver L298N", sku: "DRV-003", available: 1500, reserved: 15, intransit: 1000 },
  { _id: "part-box1", name: "Package Box 1", sku: "BOX-001", available: 3000, reserved: 20 },
  { _id: "part-S649", name: "Shipping Box", sku: "CAB-USB-A-B", available: 5000, reserved: 55 },
  { _id: "part-box2", name: "Package Box 2", sku: "BOX-002", available: 2000 }]

export const productsStock: StockOverview[] = [
  { _id: "p2", name: "Robotics Kit - Beginner", sku: "PROD-ROBO-BEG", available: 50, reserved: 5, inproduction: 10 },
  { _id: "p1", name: "ESP32 IoT Starter Kit", sku: "PROD-ESP32KIT", available: 20, inproduction: 5 },
  { _id: "p3", name: "Poloriud Sunglasses", sku: "PROD-POLSUN", available: 0, intransit: 100 }
]