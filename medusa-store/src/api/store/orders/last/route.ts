import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import OrderService from "../../../../services/order";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const orderService: OrderService = req.scope.resolve("orderService");

  const customerId = req.user!.customer_id as string;

  const order = await orderService.getLastCustomerOrder(customerId);

  res.json(order);
};
