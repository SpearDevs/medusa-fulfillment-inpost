import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import InpostFulfillmentService from '../../../../services/inpost-fulfillment'

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<any> {
  const inpostFulfillmentService: InpostFulfillmentService = req.scope.resolve(
    'inpostFulfillmentService'
  )

  try {
    const { page } = req.query

    const shipments = await inpostFulfillmentService.getShipments({ page })

    res.json(shipments)
  } catch (error) {
    const { status, data } = error.response || { status: 500, data: {} }

    res.status(status).json({
      error: data.error,
      message: data.message,
    })
  }
}

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<any> {
  const inpostFulfillmentService: InpostFulfillmentService = req.scope.resolve(
    'inpostFulfillmentService'
  )

  const data = req.body

  try {
    const createdShipment = await inpostFulfillmentService.createShipment(data)

    res.json(createdShipment)
  } catch (error) {
    const { status, data } = error.response || { status: 500, data: {} }

    res.status(status).json({
      error: data.error,
      message: data.message,
    })
  }
}
