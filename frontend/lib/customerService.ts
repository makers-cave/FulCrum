import { customersData } from "./data"
import { Customer } from "./types"

async function getCustomer(custId: string): Promise<Customer | null> {
  // replace with real fetch
  return customersData.find((c) => c._id === custId) ?? null
}