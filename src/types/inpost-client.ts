export interface Config {
  baseUrl: string
  token: string
  organizationId: string
}

export interface PointMethods {
  list: () => Promise<any>
  retrieve: (id: string) => Promise<any>
}

export interface ShipmentMethods {
  list: (query?: any) => Promise<any>
  retrieve: (id: string) => Promise<any>
  create: (data: any) => Promise<any>
  update: (id: string, data: any) => Promise<any>
  cancel: (id: string) => Promise<any>
}
