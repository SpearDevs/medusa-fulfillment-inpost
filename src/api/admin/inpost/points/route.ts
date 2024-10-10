import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import InpostFulfillmentService from "../../../../services/inpost-fulfillment"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
): Promise<any> => {
  const inpostFulfillmentService: InpostFulfillmentService = req.scope.resolve(
    "inpostFulfillmentService"
  )

  try {
    const points = await inpostFulfillmentService.getPoints()

    res.json(points)
  } catch (error) {
    const { status, data } = error.response || { status: 500, data: {} }

    res.status(status).json({
      error: data.error,
      message: data.message,
    })
  }
}
