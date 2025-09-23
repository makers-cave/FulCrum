
export type Tenant = {
  _id: string;
  name: string;
  description?: string;
  isAlsoManufacturer?: boolean;
  isAlsoSupplier?: boolean;
  isAlsoCustomer?: boolean;
  currency?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  address?: Address; // Physical address of the tenant
  contactPerson?: string; // Primary contact person
  preferredShippingMethod?: string; // Preferred shipping method (e.g., "Air", "Ground", "Sea")
  paymentTerms?: string; // Payment terms (e.g., Net 30, Net 60)
  leadTimeDays?: number; // Average lead time for orders or deliveries
  certifications?: string[]; // Certifications relevant to warehouse management (e.g., ISO, FDA)
  operatingRegions?: string[]; // Regions or countries the tenant operates in
  categoriesHandled?: string[]; // Categories of products or parts handled
  rating?: number; // Tenant rating
};

export type Customer = {
  _id: string;
  name: string;
  description?: string;
  isAlsoManufacturer?: boolean;
  isAlsoSupplier?: boolean;
  isAlsoCustomer?: boolean;
  currency?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  address?: Address;
  contactPerson?: string;
  preferred?: boolean;
  categoriesPurchased?: string[]; // Categories of products or parts purchased
  paymentTerms?: string; // Payment terms (e.g., Net 30, Net 60)
  orderHistory?: { orderId: string; date: Date; totalAmount: number }[]; // List of past orders
  rating?: number; // Customer rating
  leadTimeDays?: number; // Average lead time for orders
  preferredShippingMethod?: string; // e.g., "Air", "Ground", "Sea"
};

export type Supplier = {
  _id: string;
  name: string;
  description?: string;
  isAlsoManufacturer?: boolean;
  isAlsoSupplier?: boolean;
  isAlsoCustomer?: boolean;
  currency?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  address?: Address;
  contactPerson?: string;
  paymentTerms?: string; // Payment terms (e.g., Full Advance, 50/50, Net 30, Net 60)
  leadTimeDays?: number;
  rating?: number;
  preferred?: boolean;
  categoriesSupplied?: string[];
};

export type Manufacturer = {
  _id: string;
  name: string;
  description?: string;
  isAlsoManufacturer?: boolean;
  isAlsoSupplier?: boolean;
  isAlsoCustomer?: boolean;
  currency?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  address?: Address;
  contactPerson?: string;
  rating?: number;
  preferred?: boolean;
  categoriesManufactured?: string[];
  leadTimeDays?: number;
  paymentTerms?: string; // Payment terms (e.g., Full Advance, 50/50, Net 30, Net 60)
  certifications?: string[]; // List of certifications (e.g., ISO, FDA)
  productionCapacity?: string; // e.g., "1000 units per week"
};
export type Carrier = {
  _id: string;
  name: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: Address;
  contactPerson?: string;
  rating?: number;
  preferred?: boolean;
  trackingUrl?: string; // URL for tracking shipments
  servicesOffered?: string[]; // e.g., "Express", "Standard", "Overnight"
  capacity?: string; // e.g., "10 tons", "1000 kg"
  operatingRegions?: string[]; // List of regions or countries they operate in
  leadTimeDays?: number; // Average lead time for deliveries
  insuranceProvided?: boolean; // Whether the carrier provides insurance for shipments
  certifications?: string[]; // e.g., "ISO 9001", "Hazmat Certified"
};
export interface PhysicalAttributes {
  length?: number; // mm
  width?: number;  // mm
  height?: number; // mm
  weight?: number; // grams
  volume?: number; // cubic cm
  uom?: string;    // pieces, meters, kg, liters
  color?: string;
  material?: string;
}

export type Part = {
  _id: string
  name: string
  description: string
  category?: { _id: string; name: string }
  sku: string
  mpn?: string
  upc?: string
  manufacturer?: { _id: string; name: string }
  stock: number
  price: number
  image?: string
  status: "In Stock" | "Low Stock" | "Out of Stock"
  isAssemblable?: boolean
  isSellable?: boolean
  isVirtual: any;
  isPurchasable?: boolean
  owner?: string
  model?: string
  physical?: PhysicalAttributes
  tags?: string[]
  createdAt?: Date
  updatedAt?: Date
}
export type PartLocation = {
  _id: string
  name: string
  quantity: number
  reserved?: number
  subLocations?: PartLocation[]
}
type bOMItem = {
  _id: string;
  name: string;
  image?: string;
  sku?: string;
  qtyPerProduct?: number;
  linkType?: "Content" | "Assembly" | "Packaging" | "Shipping";
  stock?: number;
  partType?: "product" | "part";
};

type Product = {
  upc: string | number | readonly string[] | undefined;
  mpn: string | number | readonly string[] | undefined;
  model: string | number | readonly string[] | undefined;
  _id: string;
  name: string;
  sku: string;
  status: "Published" | "Draft" | "Discontinued";
  price: number;
  currency: string;
  image: string; // path such as /assets/...
  category?: SelectData;
  availableQty: number;
  reservedQty: number;
  leadTimeDays?: number;
  weightKg?: number;
  dimensions?: string;
  description?: string;
  BOM?: bOMItem[];
  bathchPerWeek?: number;
  manufacturer?: { _id: string; name: string };
  isAssembled?: boolean;
  productType?: SelectData;
  canBeAssembled?: boolean;
  isInidividualShip?: boolean
};

export type WarehouseLocation = {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  address?: Address;
  contactPerson?: string;
  phone?: string;
  email?: string;
  category: string;
  sku: string;
  status: "Active" | "Inactive";
  capacity?: number;
  currentOccupancy?: number;
  parentLocation?: string;
};

export type Address = {
  street: string;
  addressLine2?: string;
  city: string;
  state?: string;
  zipCode: string;
  country: string;
};

export type SelectData = {
  _id: string;
  name: string;
  children?: SelectData[];
  filterKey?: string;
  image?: string;
  sku?: string;
};

export type StockOverview = {
  _id: string;
  image?: string;
  name: string;
  sku: string;
  type: "part" | "product";
  category?: string;
  available: number;
  reserved?: number;
  intransit?: number;
  inproduction?: number;
  isStale?: boolean;
}

export type Lot = {
  _id: string;
  image?: string;
  description?: string;
  part_id?: string;
  product_id?: string;
  lotNumber: string; // Batch ID (unique identifier for the lot)
  supplierBatchNumber?: string;
  quantity: number;
  status: "Available" | "Quarantined" | "On Hold" | "Depleted";
  receivedDate?: Date;
  manufactureDate?: Date;
  expiryDate?: Date;
  supplier?: SelectData;
  unitCost?: number;
  location?: SelectData; // Warehouse, Bin, Shelf location
  certificateOfAnalysisUrl?: string; // Link to CoA document
  packageCount?: string;
  packageDesc?: string;
};

export type LotHistory = {
  _id: string;
  lot_id: string;
  date: Date;
  action: string;
  details?: string;
}