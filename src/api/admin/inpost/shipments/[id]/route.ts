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

  res.json(await inpostFulfillmentService.getShipment(id));
}

export async function PUT(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<any> {
  const inpostFulfillmentService: InpostFulfillmentService = req.scope.resolve(
    'inpostFulfillmentService'
  );

  const { id } = req.params

  const data = req.body;

  res.json(await inpostFulfillmentService.updateShipment(id, data));
}

export async function DELETE(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<any> {
  const inpostFulfillmentService: InpostFulfillmentService = req.scope.resolve(
    'inpostFulfillmentService'
  );

  const { id } = req.params

  res.json(await inpostFulfillmentService.cancelShipment(id));
}
