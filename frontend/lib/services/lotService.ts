import { useId } from "react";
import { lotHistories, lotsData, PartCategories, partsData } from "../data";
import { Lot, LotHistory, Part } from "../types";

async function getLot(lotID: string): Promise<Lot | null> {
  // replace with real fetch
  return lotsData.find((p) => p._id === lotID) ?? null
}

function getLots():Lot[] {
  return lotsData;
}
async function getLotHistory(lotID: string): Promise< LotHistory[] | null> {
return lotHistories.filter((lh) => lh.lot_id === lotID) ?? null

}
export { getLot, getLots, getLotHistory }