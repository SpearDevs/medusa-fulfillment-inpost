import axios, { AxiosInstance } from "axios"

interface Config {
  baseUrl: string
  token: string
  organizationId: string
}

interface PointMethods {
  list: () => Promise<any>
  retrieve: (id: any) => Promise<any>
}

interface ShipmentMethods {
  list: (query?: any) => Promise<any>
  retrieve: (id: any) => Promise<any>
  create: (data: any) => Promise<any>
  update: (id: any, data: any) => Promise<any>
  cancel: (id: any) => Promise<any>
}

class Inpost {
  client: AxiosInstance
  config: Config
  points: PointMethods
  shipments: ShipmentMethods

  constructor(config: Config) {
    /** @private @constant {AxiosInstance} */
    this.client = axios.create({
      baseURL: config.baseUrl,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.token}`,
      },
    })

    /** @private @constant {Config} */
    this.config = { ...config }

    this.points = this.buildPointsEndpoints_()

    this.shipments = this.buildShipmentsEndpoints_()
  }

  getAnyInfo = () => {
    return {
      create: async (data) => {
        const path = `/v1/organizations/${this.config.organizationId}`

        return this.client({
          method: "GET",
          url: path,
          data: {
            data,
          },
        }).then(({ data }) => data)
      },
    }
  }

  buildPointsEndpoints_ = () => {
    return {
      list: async () => {
        const path = "/v1/points?type=parcel_locker"

        return await this.client({
          method: "GET",
          url: path,
        }).then(({ data }) => data)
      },
      retrieve: async (id) => {
        const path = `/v1/points/${id}?type=parcel_locker`

        return await this.client({
          method: "GET",
          url: path,
        }).then(({ data }) => data)
      }
    }
  }

  buildShipmentsEndpoints_ = () => {
    return {
      list: async (query?) => {
        const path = `/v1/organizations/${this.config.organizationId}/shipments`

        return await this.client({
          method: "GET",
          url: path,
          params: query,
        }).then(({ data }) => data)
      },
      retrieve: async (id) => {
        const path = `/v1/shipments/${id}`

        return await this.client({
          method: "GET",
          url: path,
        }).then(({ data }) => data)
      },
      create: async (data) => {
        const path = `/v1/organizations/${this.config.organizationId}/shipments`

        return await this.client({
          method: "POST",
          url: path,
          data: {
            ...data
          }
        }).then(({ data }) => data)
      },
      update: async (id, data) => {
        const path = `/v1/shipments/${id}`

        return await this.client({
          method: "PUT",
          url: path,
        }).then(({ data }) => data)
      },
      cancel: async (id) => {
        const path = `/v1/shipments/${id}`

        return await this.client({
          method: "DELETE",
          url: path,
        }).then(({ data }) => data)
      }
    }
  }

  // buildDocumentEndpoints_ = () => {
  //   return {
  //     create: async (data) => {
  //       const path = `/v2/documents`
  //       return this.client_({
  //         method: "POST",
  //         url: path,
  //         data: {
  //           data,
  //         },
  //       }).then(({ data }) => data)
  //     },
  //   }
  // }

  // buildShippingRateEndpoints_ = () => {
  //   return {
  //     retrieve: async (id) => {
  //       const path = `/v2/shipping_rates/${id}`
  //       return this.client_({
  //         method: "GET",
  //         url: path,
  //       }).then(({ data }) => data)
  //     },
  //     list: async (params = {}) => {
  //       let path = `/v2/shipping_rates`

  //       if (Object.entries(params).length) {
  //         const search = Object.entries(params).map(([key, value]) => {
  //           return `filter[${key}]=${value}`
  //         })
  //         path += `?${search.join("&")}`
  //       }

  //       return this.client_({
  //         method: "GET",
  //         url: path,
  //       }).then(({ data }) => data)
  //     },
  //   }
  // }

  // buildOrderEndpoints_ = () => {
  //   return {
  //     retrieve: async (id) => {
  //       const path = `/v2/orders/${id}`
  //       return this.client_({
  //         method: "GET",
  //         url: path,
  //       }).then(({ data }) => data)
  //     },
  //     create: async (data) => {
  //       const path = `/v2/orders`
  //       return this.client_({
  //         method: "POST",
  //         url: path,
  //         data: {
  //           data,
  //         },
  //       }).then(({ data }) => data)
  //     },
  //     update: async (id, data) => {
  //       const path = `/v2/orders/${id}`
  //       return this.client_({
  //         method: "PATCH",
  //         url: path,
  //         data: {
  //           data,
  //         },
  //       }).then(({ data }) => data)
  //     },
  //     delete: async (id) => {
  //       const path = `/v2/orders/${id}`
  //       return this.client_({
  //         method: "DELETE",
  //         url: path,
  //       }).then(({ data }) => data)
  //     },
  //   }
  // }

  // buildShipmentEndpoints_ = () => {
  //   return {
  //     retrieve: async (id) => {
  //       const path = `/v2/shipments/${id}`
  //       return this.client_({
  //         method: "GET",
  //         url: path,
  //       }).then(({ data }) => data)
  //     },
  //     create: async (data) => {
  //       const path = `/v2/shipments`
  //       return this.client_({
  //         method: "POST",
  //         url: path,
  //         data: {
  //           data,
  //         },
  //       }).then(({ data }) => data)
  //     },
  //   }
  // }

  // buildReturnEndpoints_ = () => {
  //   return {
  //     create: async (data) => {
  //       const path = `/v2/returns`
  //       return this.client_({
  //         method: "POST",
  //         url: path,
  //         data: {
  //           data,
  //         },
  //       }).then(({ data }) => data)
  //     },
  //   }
  // }
}

export default Inpost
