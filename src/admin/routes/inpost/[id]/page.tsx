import { useParams } from 'react-router-dom';
import { useAdminCustomQuery } from 'medusa-react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@medusajs/ui';

const InpostSingleShipmentPage = () => {
  const { id } = useParams();

  const { data: shipment, isLoading, isError } = useAdminCustomQuery(`/inpost/shipments/${id}`, ['shipment', id]);

  const navigate = useNavigate();

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  if (isError) {
    return <Container>Error</Container>;
  }

  return (
    <>
      <button className="px-small py-xsmall mb-xsmall" onClick={() => navigate('..')}>
        <div className="gap-x-xsmall text-grey-50 inter-grey-40 inter-small-semibold flex items-center">
          <span className="ml-1">Back to Shipments</span>
        </div>
      </button>

      <div className="gap-x-base grid grid-cols-12">
        <div className="gap-y-xsmall col-span-8 flex flex-col">
          <Container>
            <h2 className="inter-base-semibold">Shipment details</h2>

            <div className="inter-base-regular text-grey-50 flex items-center justify-between">
              <p className="capitalize">Id</p>
              <p>{shipment.id}</p>
            </div>

            <div className="inter-base-regular text-grey-50 flex items-center justify-between">
              <p className="capitalize">Point</p>
              <p>{shipment.custom_attributes.target_point}</p>
            </div>

            <div className="inter-base-regular text-grey-50 flex items-center justify-between">
              <p className="capitalize">Service</p>
              <p>{shipment.service}</p>
            </div>

            <div className="inter-base-regular text-grey-50 flex items-center justify-between">
              <p className="capitalize">Status</p>
              <p>{shipment.status}</p>
            </div>

            <div className="inter-base-regular text-grey-50 flex items-center justify-between">
              <p className="capitalize">Reference</p>
              <p>{shipment.reference}</p>
            </div>
          </Container>
        </div>

        <div className="gap-y-xsmall col-span-4 flex flex-col">
          <Container>
            <div className="flex flex-col gap-y-3">
              <h2 className="inter-base-semibold">Client details</h2>

              {Object.entries(shipment.receiver).map(([key, value]) => {
                return (
                  <div key={key} className="inter-base-regular text-grey-50 flex items-center justify-between">
                    <p className="capitalize">{key}</p>
                    <p>{value != null ? value.toString() : '-'}</p>
                  </div>
                );
              })}
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default InpostSingleShipmentPage;
