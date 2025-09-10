
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