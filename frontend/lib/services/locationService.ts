import { manufacturersData, sampleLocations } from "../data"
import { Manufacturer, SelectData } from "../types"
import { PrismaClient} from "../../../backend/generated/prisma"

const prisma = new PrismaClient()
async function getLocation(locID: string): Promise<Location | null> {
  // replace with real fetch

  return prisma.location.findMany()
}

function getLocationsshort(): SelectData[] {
  // replace with real fetch
  return sampleLocations
}

export { getLocation, getLocationsshort }