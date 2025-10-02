import { orders } from "../data";
import { Order } from "../types";

async function getOrder(orderid: string): Promise<Order | null> {
  // replace with real fetch
  return orders.find((p) => p.id === orderid) ?? null
}

function getOrders(): Order[] {
  return  orders;
}
export { getOrder, getOrders }