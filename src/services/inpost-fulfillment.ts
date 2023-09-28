import {
  AbstractFulfillmentService, 
  Cart, 
  Fulfillment, 
  LineItem, 
  Order,
 } from "@medusajs/medusa";
import { CreateReturnType } from "@medusajs/medusa/dist/types/fulfillment-provider";
import Inpost from "../utils/inpost";

class InpostFulfillmentService extends AbstractFulfillmentService {
  static identifier = "inpost"
  client_: Inpost;

  constructor(
    container,
    options
  ) {
    super(container);

    /** @private @const {AxiosClient} */
    this.client_ = new Inpost({
      baseUrl: process.env.INPOST_BASE_URL,
      organizationId: process.env.INPOST_ORGANIZATION_ID,
      token: process.env.INPOST_TOKEN,
    })
  }
  
  async getPoints(): Promise<any> {
    return await this.client_.points_.list();
  }

  async getPoint(id): Promise<any> {
    return await this.client_.points_.retrieve(id);
  }

  async getShipments(): Promise<any> {
    return await this.client_.shipments_.list();
  }

  async getShipment(id): Promise<any> {
    return await this.client_.shipments_.retrieve(id);
  }

  async createShipment(data): Promise<any> {
    return await this.client_.shipments_.create(data);
  }

  async updateShipment(id, data): Promise<any> {
    return await this.client_.shipments_.update(id, data);
  }

  async cancelShipment(id): Promise<any> {
    return await this.client_.shipments_.cancel(id);
  }

  async getFulfillmentOptions(): Promise<any> {
    const clientTest = await this.client_.getAnyInfo();
    
    return await clientTest.create({});
  }

  async validateFulfillmentData(
    optionData: { [x: string]: unknown }, 
    data: { [x: string]: unknown },
    cart: Cart
  ): Promise<Record<string, unknown>> {
    throw new Error("Method not implemented.")
  }

  async validateOption(
    data: { [x: string]: unknown }
  ): Promise<boolean> {
    throw new Error("Method not implemented.")
  }

  async canCalculate(
    data: { [x: string]: unknown }
  ): Promise<boolean> {
    throw new Error("Method not implemented.")
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
    throw new Error("Method not implemented.")
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
}

export default InpostFulfillmentService;
