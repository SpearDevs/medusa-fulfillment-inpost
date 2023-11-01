import axios, { AxiosInstance } from "axios";

class Inpost {
  baseUrl_: string;
  organizationId_: string;
  token_: string;
  client_: AxiosInstance;
  points_: any;
  shipments_: { list: () => Promise<any>; retrieve: (id: any) => Promise<any>; create: (data: any) => Promise<any>; update: (id: any, data: any) => Promise<any>; cancel: (id: any) => Promise<any>; };

  constructor({ baseUrl, organizationId, token }) {
    this.baseUrl_ = baseUrl;

    this.organizationId_ = organizationId;

    this.token_ = token;

    this.client_ = axios.create({
      baseURL: baseUrl,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    this.points_ = this.buildPointsEndpoints_();

    this.shipments_ = this.buildShipmentsEndpoints_();
  }

  // async request(data) {
  //   return this.client_(data).then(({ data }) => data);
  // }

  getAnyInfo = () => {
    return {
      create: async (data) => {
        const path = `/v1/organizations/${this.organizationId_}`;
        return this.client_({
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
        const path = "/v1/points?type=parcel_locker";

        return await this.client_({
          method: "GET",
          url: path,
        }).then(({ data }) => data);
      },
      retrieve: async (id) => {
        const path = `/v1/points/${id}?type=parcel_locker`;

        return await this.client_({
          method: "GET",
          url: path,
        }).then(({ data }) => data);
      }
    }
  }

  buildShipmentsEndpoints_ = () => {
    return {
      list: async () => {
        const path = `/v1/organizations/${this.organizationId_}/shipments`;

        return await this.client_({
          method: "GET",
          url: path,
        }).then(({ data }) => data);
      },
      retrieve: async (id) => {
        const path = `/v1/shipments/${id}`;

        return await this.client_({
          method: "GET",
          url: path,
        }).then(({ data }) => data);
      },
      create: async (data) => {
        try {
          const path = `/v1/organizations/${this.organizationId_}/shipments`;

          return await this.client_({
            method: "POST",
            url: path,
            data: {
              ...data
            }
          }).then(({ data }) => data);
        } catch (error) {
          console.error(error);
        }
      },
      update: async (id, data) => {
        const path = `/v1/shipments/${id}`;

        return await this.client_({
          method: "PUT",
          url: path,
        }).then(({ data }) => data);
      },
      cancel: async (id) => {
        const path = `/v1/shipments/${id}`;

        return await this.client_({
          method: "DELETE",
          url: path,
        }).then(({ data }) => data);
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

export default Inpost;
