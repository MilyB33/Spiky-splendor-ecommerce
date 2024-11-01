import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import ReturnService from "src/services/return";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const customerId = req.user!.customer_id;
  const query = req.query;

  const take = Number(query.limit);
  const skip = Number(query.offset);

  const returnService: ReturnService = req.scope.resolve("returnService");
  const returns = await returnService.customerReturns(customerId, {
    take,
    skip,
  });

  res.json(returns);
}
