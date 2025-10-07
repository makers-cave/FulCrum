import { manufacturersData, sampleLocations } from "../data"
import { Manufacturer, SelectData } from "../types"
import { PrismaClient} from "../../../backend/generated/prisma"
import { NextResponse } from "next/server";

const prisma = new PrismaClient()
async function getLocations() {
  // replace with real fetch
  const locations = await prisma.location.findMany();
  return new NextResponse(JSON.stringify(locations), {status: 200});
}
async function getLocation(locID: string) {
  return prisma.location.findUnique({where: {id:locID}});
}

function getLocationsshort(): SelectData[] {
  // replace with real fetch
  return null as unknown as SelectData[];
}

export { getLocations, getLocationsshort }