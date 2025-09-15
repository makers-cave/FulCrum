import { useId } from "react";
import { PartCategories, partsData } from "../data";
import { Part } from "../types";

// function getDefaultPart(): Part {
//   return {
//       _id: useId(),
//       name: "Part Alpha",
//       description: "This is description",
//       mpn: "PA-001",
//       sku: "SKU-001",
//       upc: "UPC-001",
//       manufacturer: "Manufacturer A",
//       price: 15.0,
//       image: "",
//       status: "In Stock",
//       category: "Category A",
//       stock: 100,
//     }
// }
async function getPart(partId: string): Promise<Part | null> {
  // replace with real fetch
  return partsData.find((p) => p._id === partId) ?? null
}

function getPartCategories(): { _id: string; name: string }[] {
  return PartCategories;
}
export { getPart, getPartCategories }