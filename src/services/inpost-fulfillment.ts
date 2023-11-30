import {
  AbstractFulfillmentService,
  Cart,
  Fulfillment,
  LineItem,
  MedusaContainer,
  Order
} from "@medusajs/medusa"
import { CreateReturnType } from "@medusajs/medusa/dist/types/fulfillment-provider"
import Inpost from "../utils/inpost"

class InpostFulfillmentService extends AbstractFulfillmentService {
  static identifier = "inpost-fulfillment";

  inpost: Inpost
  options: any

  constructor(container: MedusaContainer, options) {
    super(container)

    this.options = options

    if (!options.default_template) {
      this.options.default_template = "medium"
    }

    /** @private @const {AxiosClient} */
    this.inpost = new Inpost({
      baseUrl: this.options.base_url || process.env.INPOST_BASE_URL,
      token: this.options.token || process.env.INPOST_TOKEN,
      organizationId: this.options.organization_id || process.env.INPOST_ORGANIZATION_ID,
    })
  }

  async getFulfillmentOptions(): Promise<any[]> {
    return [
      { id: "Parcel Locker" },
    ]
  }

  async validateFulfillmentData(
    optionData: { [x: string]: unknown },
    data: { [x: string]: unknown },
    cart: Cart
  ): Promise<Record<string, unknown>> {
    if (optionData.id === "Parcel Locker") {
      if (cart.shipping_address.phone === null) {
        throw new Error("Phone number is required")
      }

      if (!data?.target_point) {
        throw new Error("Target point is required")
      } else {
        // TODO: validate target point
      }
    } else {
      throw new Error("Invalid data")
    }

    return {
      target_point: "KRA012",
      ...data,
    }
  }

  async validateOption(
    data: { [x: string]: unknown }
  ): Promise<boolean> {
    return data.id == "Parcel Locker"
  }

  async canCalculate(
    data: { [x: string]: unknown }
  ): Promise<boolean> {
    return false
  }

  async calculatePrice(
    optionData: { [x: string]: unknown },
    data: { [x: string]: unknown },
    cart: Cart
  ): Promise<number> {
    throw new Error("Method not implemented.")
  }

  async createFulfillment(
    data: { [x: string]: unknown },
    items: LineItem[],
    order: Order,
    fulfillment: Fulfillment
  ): Promise<any> {
    const { target_point } = data
    const { shipping_address, email, display_id } = order
    const { first_name, last_name, phone } = shipping_address

    const shipmentData = {
      receiver: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
      },
      parcels: {
        template: fulfillment.metadata?.size || this.options.default_template,
      },
      custom_attributes: {
        sending_method: "parcel_locker",
        target_point: target_point,
      },
      service: "inpost_locker_standard",
      reference: `#${display_id}`,
    }

    const { id: shipmentId } = await this.createShipment(shipmentData)

    return { shipmentId }
  }

  async cancelFulfillment(
    fulfillment: { [x: string]: unknown }
  ): Promise<any> {
    throw new Error("Method not implemented.")
  }

  async createReturn(
    returnOrder: CreateReturnType
  ): Promise<Record<string, unknown>> {
    throw new Error("Method not implemented.")
  }

  async getFulfillmentDocuments(
    data: { [x: string]: unknown }
  ): Promise<any> {
    throw new Error("Method not implemented.")
  }

  async getReturnDocuments(
    data: Record<string, unknown>
  ): Promise<any> {
    throw new Error("Method not implemented.")
  }

  async getShipmentDocuments(
    data: Record<string, unknown>
  ): Promise<any> {
    throw new Error("Method not implemented.")
  }

  async retrieveDocuments(
    fulfillmentData: Record<string, unknown>,
    documentType: "invoice" | "label"
  ): Promise<any> {
    throw new Error("Method not implemented.")
  }

  async getPoints(): Promise<any> {
    return await this.inpost.points.list()
  }

  async getPoint(id): Promise<any> {
    return await this.inpost.points.retrieve(id)
  }

  async getShipments(query?): Promise<any> {
    return await this.inpost.shipments.list(query)
  }

  async getShipment(id): Promise<any> {
    return await this.inpost.shipments.retrieve(id)
  }

  async createShipment(data): Promise<any> {
    return await this.inpost.shipments.create(data)
  }

  async updateShipment(id, data): Promise<any> {
    return await this.inpost.shipments.update(id, data)
  }

  async cancelShipment(id): Promise<any> {
    return await this.inpost.shipments.cancel(id)
  }
}

export default InpostFulfillmentService
