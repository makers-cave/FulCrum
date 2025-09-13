
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
};
export type Carrier = {
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
};
export type Part = {
  _id: string
  name: string
  description: string
  category: string
  sku: string
  stock: number
  price: string
  image: string
  status: "In Stock" | "Low Stock" | "Out of Stock"
  isAssemblable?: boolean
  isSellable?: boolean
  isPurchasable?: boolean
  owner?: string
  defaultLocation?: string
  respnsibleUser?: string
}
export type PartLocation = {
  _id: string
  name: string
  quantity: number
  reserved?: number
  subLocations?: PartLocation[]
}
type PartLink = {
  id: string;
  partName: string;
  image?: string;
  partSku: string;
  qtyPerProduct: number;
  linkType?: "Content" | "Assembly" | "Packaging" | "Shipping";
  stock?: number;
};

type Product = {
  id: string;
  name: string;
  sku: string;
  status: "Published" | "Draft" | "Discontinued";
  price: number;
  currency: string;
  image: string; // path such as /assets/...
  category: string;
  availableQty: number;
  reservedQty: number;
  leadTimeDays?: number;
  weightKg?: number;
  dimensions?: string;
  description?: string;
  linkedParts?: PartLink[];
  bathchPerWeek?: number;
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