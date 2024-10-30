import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import OrderService from "src/services/order";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const idParam: string = req.params.id;

  const orderService: OrderService = req.scope.resolve("orderService");

  const order = await orderService.cancel(idParam);

  res.json(order);
};
