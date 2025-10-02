import { useId } from "react";
import { lotHistories, lotsData, PartCategories, partsData } from "../data";
import { Lot, LotHistory, Part } from "../types";

async function getLot(lotID: string): Promise<Lot | null> {
  // replace with real fetch
  return lotsData.find((p) => p.id === lotID) ?? null
}

function getLots(): Lot[] {
  return lotsData;
}
async function getLotHistory(lotID: string): Promise<LotHistory[] | null> {
  return lotHistories.filter((lh) => lh.lot_id === lotID) ?? null
}
async function getLotsbyPart(partid:string): Promise<Lot[] | null>  {
  return lotsData.filter((lot) => lot.part?.id === partid) ?? null;
}
async function getLotsbyProducts(prodid:string): Promise<Lot[] | null>  {
  return lotsData.filter((lot) => lot.product?.id === prodid) ?? null;  
}
export { getLot, getLots, getLotHistory }