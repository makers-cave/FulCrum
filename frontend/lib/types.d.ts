interface TenantPageProps {
    params: { tenantId: string }
  }
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

  interface CustomerPageProps {
    params: { custid: string }
  }
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