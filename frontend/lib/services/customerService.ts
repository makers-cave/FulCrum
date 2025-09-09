import { useId } from "react"
import { customersData } from "../data"
import { Customer } from "../types"


function getDefaultCustomer(): Customer {
  return {
      _id: useId(),
      name: "Customer Alpha",
      description: "This is description",
      isAlsoManufacturer: false,
      isAlsoSupplier: true,
      isAlsoCustomer: true,
      currency: "USD",
      avatar: "",
    }
}
async function getCustomer(custId: string): Promise<Customer | null> {
  // replace with real fetch
  return customersData.find((c) => c._id === custId) ?? null
}

export { getCustomer, getDefaultCustomer }