import { useId } from "react";
import { productCategories, productsData, productTypes } from "../data";
import { Part, Product, SelectData } from "../types";

async function getProduct(productID: string): Promise<Product | null> {
  // replace with real fetch
  return productsData.find((p) => p.id === productID) ?? null
}
function getProductTypes():SelectData[] {
  return productTypes;
}
function getProductCategories(): SelectData[]{
  return productCategories;
}
export { getProduct, getProductTypes, getProductCategories }