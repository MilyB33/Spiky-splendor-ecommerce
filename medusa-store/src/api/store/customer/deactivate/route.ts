import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import CustomerService from "../../../../services/customer";

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const customerService: CustomerService = req.scope.resolve("customerService");

  const customerId = req.user!.customer_id as string;

  await customerService.deactivate(customerId);

  res.json("Account deactivated");
};
