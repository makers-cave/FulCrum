import { useId } from "react";
import { PartCategories, partsData } from "../data";
import { Part } from "../types";

async function getPart(partId: string): Promise<Part | null> {
  // replace with real fetch
  return partsData.find((p) => p._id === partId) ?? null
}

function getPartCategories(): { _id: string; name: string }[] {
  return PartCategories;
}
export { getPart, getPartCategories }