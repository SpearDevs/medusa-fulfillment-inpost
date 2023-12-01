import type { WidgetConfig, OrderDetailsWidgetProps } from "@medusajs/admin";
import { useAdminCustomQuery } from "medusa-react";
import { Container } from "@medusajs/ui";

const ParcelDetails = ({ shippingMethod }) => {
  const targetPoint = shippingMethod.data.target_point;
  const { data: point, isError } = useAdminCustomQuery(
    `/inpost/points/${targetPoint}`,
    ["point", targetPoint]
  );

  if (!point || isError) return null;

  const { name, image_url, address_details, opening_hours } = point;

  return (
    <Container className="mt-base">
      <h1 className="inter-xlarge-semibold text-grey-90 mb-2">Paczkomat</h1>

      <div className="flex items-center gap-3">
        <img
          src={image_url}
          alt="Inpost Point"
          className="w-28 h-28 object-cover rounded-md"
        />

        <div className="text-gray-600 flex flex-col">
          <strong>{name}</strong>

          <p>
            {address_details?.post_code}, {address_details?.city},{" "}
            {address_details?.province}
          </p>

          <p>
            {address_details?.street}, {address_details?.building_number},{" "}
            {address_details?.flat_number}
          </p>

          <p>{opening_hours}</p>
        </div>
      </div>
    </Container>
  );
};

const ShipmentDetails = ({ shipmentId }) => {
  const { data: shipment, isError } = useAdminCustomQuery(
    `/inpost/shipments/${shipmentId}`,
    ["shipment", shipmentId]
  );

  if (!shipment || isError) return null;

  const { id, status, created_at, updated_at, parcels } = shipment;

  const createdAtDate = new Date(created_at);
  const updatedAtDate = new Date(updated_at);

  return (
    <div className="flex flex-col text-gray-600">
      <strong>Shipment #{id}</strong>

      <p>Status - {status}</p>

      <p>Creation date - {createdAtDate.toLocaleString()}</p>

      <p>Edit date - {updatedAtDate.toLocaleString()}</p>

      {parcels.map((parcel, index) => (
        <div key={index}>
          <p>Shipment size: {parcel?.template}</p>
          <p>Tracking code: {parcel?.tracking_number}</p>
        </div>
      ))}
    </div>
  );
};

const InpostWidget = ({ order }: OrderDetailsWidgetProps) => {
  const inpostShippingMethods = order.shipping_methods.filter(
    (method) => method.shipping_option.data?.id === "Parcel Locker"
  );
  const inpostFulfilments = order.fulfillments.filter(
    (fulfillment) => fulfillment.data?.shipmentId
  );

  if (inpostShippingMethods.length === 0) return null;

  return (
    <>
      {inpostShippingMethods.map((shippingMethod, index) => (
        <ParcelDetails key={index} shippingMethod={shippingMethod} />
      ))}

      {inpostFulfilments.length !== 0 && (
        <Container className="flex flex-col mt-base gap-2">
          <h1 className="inter-xlarge-semibold text-grey-90">Shipments</h1>

          {inpostFulfilments.map((fulfillment, index) => (
            <ShipmentDetails
              key={index}
              shipmentId={fulfillment.data.shipmentId}
            />
          ))}
        </Container>
      )}
    </>
  );
};

export const config: WidgetConfig = {
  zone: "order.details.after",
};

export default InpostWidget;
