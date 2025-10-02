import { useId } from "react"
import { tenantData } from "../data"
import { Tenant } from "../types"


function getDefaultTenant(): Tenant {
  return {
      id: useId(),
      name: "Tenant Alpha",
      description: "This is description",
      isAlsoManufacturer: false,
      isAlsoSupplier: true,
      isAlsoCustomer: true,
      currency: "USD",
      avatar: "",
    }
}
async function getTenant(tenantidId: string): Promise<Tenant | null> {
  // replace with real fetch
  return tenantData.find((t) => t.id === tenantidId) ?? null
}

export { getTenant, getDefaultTenant }