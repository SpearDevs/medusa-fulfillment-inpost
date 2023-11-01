import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import InpostFulfillmentService from '../../../services/inpost-fulfillment';

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<any> {
  const inpostFulfillmentService: InpostFulfillmentService = req.scope.resolve(
    'inpostFulfillmentService'
  );

  res.json(await inpostFulfillmentService.getFulfillmentOptions());
}
