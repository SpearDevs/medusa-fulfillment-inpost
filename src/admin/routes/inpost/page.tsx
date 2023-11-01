import { RouteConfig } from '@medusajs/admin';
import { useAdminCustomQuery } from 'medusa-react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, IconButton } from '@medusajs/ui';
import { ArrowDownCircle } from '@medusajs/icons';

const InpostShipmentsPage = () => {
  const { data, isLoading, isError, refetch, isRefetching } = useAdminCustomQuery(`/inpost/shipments`, ['shipments']);

  const navigate = useNavigate();

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  if (isError) {
    return <Container>Error</Container>;
  }

  const shipments = data.items;

  return (
    <Container>
      <div className="flex justify-between mb-2">
        <h1 className="inter-large-semibold">Inpost Shipments</h1>

        <IconButton variant="transparent" onClick={() => refetch()} isLoading={isRefetching}>
          <ArrowDownCircle />
        </IconButton>
      </div>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Shipment ID</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Created at</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {shipments.map((shipment) => {
            const date = new Date(shipment.created_at);

            return (
              <Table.Row key={shipment.id} className="cursor-pointer" onClick={() => navigate(`${shipment.id}`)}>
                <Table.Cell>{shipment.id}</Table.Cell>
                <Table.Cell>{shipment.status}</Table.Cell>
                <Table.Cell>{shipment.receiver.email}</Table.Cell>
                <Table.Cell>{date.toLocaleString()}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      <Table.Pagination
        count={parseInt(data.count)}
        pageSize={parseInt(data.per_page)}
        pageIndex={parseInt(data.page) - 1}
        pageCount={Math.ceil(data.count / data.per_page)}
        canPreviousPage={data.page > 1}
        canNextPage={data.page < Math.ceil(data.count / data.per_page)}
        previousPage={() => {}}
        nextPage={() => {}}
      />
    </Container>
  );
};

export const config: RouteConfig = {
  link: {
    label: 'Inpost Shipments',
  },
};

export default InpostShipmentsPage;
