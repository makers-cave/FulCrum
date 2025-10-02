import { useId } from "react"
import { customersData } from "../data"
import { Carrier } from "../types"


function getDefaultCarrier(): Carrier {
  return {
      id: useId(),
      name: "Carrier Alpha",
      description: "This is description",
      isAlsoManufacturer: false,
      isAlsoSupplier: true,
      isAlsoCustomer: true,
      currency: "USD",
      avatar: "",
    }
}
async function getCarrier(carrierid: string): Promise<Carrier | null> {
  // replace with real fetch
  return customersData.find((c) => c.id === carrierid) ?? null
}

export { getCarrier, getDefaultCarrier }