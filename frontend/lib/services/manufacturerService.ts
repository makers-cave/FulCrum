import { useId } from "react"
import { manufacturersData } from "../data"
import { Manufacturer, SelectData } from "../types"


function getDefaultManufacturer(): Manufacturer {
  return {
      _id: useId(),
      name: "Manufacturer Alpha",
      description: "This is description",
      isAlsoManufacturer: false,
      isAlsoSupplier: true,
      isAlsoCustomer: true,
      currency: "USD",
      avatar: "",
    }
}
async function getManufacturer(manufacturerId: string): Promise<Manufacturer | null> {
  // replace with real fetch
  return manufacturersData.find((c) => c._id === manufacturerId) ?? null
}

function getManufacturersshort(): SelectData[] {
  // replace with real fetch
  return manufacturersData
}

export { getManufacturer, getDefaultManufacturer, getManufacturersshort }