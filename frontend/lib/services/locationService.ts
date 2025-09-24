import { useId } from "react"
import { manufacturersData, sampleLocations } from "../data"
import { Manufacturer, SelectData } from "../types"


async function getLocation(locID: string): Promise<Manufacturer | null> {
  // replace with real fetch
  return manufacturersData.find((c) => c._id === locID) ?? null
}

function getLocationsshort(): SelectData[] {
  // replace with real fetch
  return sampleLocations
}

export { getLocation, getLocationsshort }