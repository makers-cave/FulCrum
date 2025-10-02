import { useId } from "react"
import { suppliersData } from "../data"
import { SelectData, Supplier } from "../types"


function getDefaultSupplier(): Supplier {
  return {
      id: useId(),
      name: "New Supplier",
      description: "This is description",
      isAlsoManufacturer: false,
      isAlsoSupplier: true,
      isAlsoCustomer: true,
      currency: "USD",
      avatar: "",
    }
}
async function getSupplier(supplierId: string): Promise<Supplier | null> {
  // replace with real fetch
  return suppliersData.find((c) => c._id === supplierId) ?? null
}
function getSuppliersShort(): SelectData[] {
  return suppliersData
}
export { getSupplier, getDefaultSupplier, getSuppliersShort }