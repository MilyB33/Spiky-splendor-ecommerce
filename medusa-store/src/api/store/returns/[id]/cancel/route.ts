import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import ReturnService from "src/services/return";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const idParam: string = req.params.id;

  const returnService: ReturnService = req.scope.resolve("returnService");

  const ret = await returnService.cancel(idParam);

  res.json(ret);
};
