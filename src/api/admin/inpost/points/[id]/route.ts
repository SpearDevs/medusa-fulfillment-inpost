import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import InpostFulfillmentService from '../../../../../services/inpost-fulfillment';

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<any> {
  const inpostFulfillmentService: InpostFulfillmentService = req.scope.resolve(
    'inpostFulfillmentService'
  );

  const { id } = req.params

  res.json(await inpostFulfillmentService.getPoint(id));
}
