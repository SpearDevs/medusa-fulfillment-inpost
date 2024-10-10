import {
  AbstractFulfillmentService,
  Cart,
  Fulfillment,
  LineItem,
  MedusaContainer,
  Order
} from "@medusajs/medusa"
import { CreateReturnType } from "@medusajs/medusa/dist/types/fulfillment-provider"
import InpostClient from "../utils/inpost-client"

class InpostFulfillmentService extends AbstractFulfillmentService {
  static identifier = "inpost";

  inpostClient: InpostClient
  options: any

  constructor(container: MedusaContainer, options) {
    super(container)

    this.options = options

    this.options.default_template ||= process.env.INPOST_DEFAULT_TEMPLATE

    /** @private @const {AxiosClient} */
    this.inpostClient = new InpostClient({
      baseUrl: this.options.base_url || process.env.INPOST_BASE_URL,
      token: this.options.token || process.env.INPOST_TOKEN,
      organizationId: this.options.organization_id || process.env.INPOST_ORGANIZATION_ID,
    })
  }

  async getFulfillmentOptions(): Promise<any[]> {
    return [
      { id: "inpost-fulfillment-parcel" },
    ]
  }

  async validateFulfillmentData(
    optionData: { [x: string]: unknown },
    data: { [x: string]: unknown },
    cart: Cart
  ): Promise<Record<string, unknown>> {
    if (optionData.id === "inpost-fulfillment-parcel") {
      const { phone } = cart.shipping_address;

      if (phone === null) {
        throw new Error("Phone number is required")
      } else {
        const sanitizedPhone = phone.replace(/\s+/g, '');
        const phoneRegex = /^(?:(\(?((\+|00)[1-9][0-9]{0,2})\)?)?([0-9]{7,13}))$/;

        if (!phoneRegex.test(sanitizedPhone)) {
            throw new Error("Invalid phone number format");
        }
      }

      if (!data?.target_point) {
        throw new Error("Target point is required")
      } else {
        const point = await this.getPoint(data.target_point as string);

        if (point?.key === "point_not_found") {
          throw new Error("Target point not found");
        }
      }
    } else {
      throw new Error("Invalid data")
    }

    return data
  }

  async validateOption(
    data: { [x: string]: unknown }
  ): Promise<boolean> {
    return data.id == "inpost-fulfillment-parcel"
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
    return await this.inpostClient.points.list()
  }

  async getPoint(id: string): Promise<any> {
    return await this.inpostClient.points.retrieve(id)
  }

  async getShipments(query?): Promise<any> {
    return await this.inpostClient.shipments.list(query)
  }

  async getShipment(id: string): Promise<any> {
    return await this.inpostClient.shipments.retrieve(id)
  }

  async createShipment(data): Promise<any> {
    return await this.inpostClient.shipments.create(data)
  }

  async updateShipment(id: string, data): Promise<any> {
    return await this.inpostClient.shipments.update(id, data)
  }

  async cancelShipment(id: string): Promise<any> {
    return await this.inpostClient.shipments.cancel(id)
  }
}

export default InpostFulfillmentService
