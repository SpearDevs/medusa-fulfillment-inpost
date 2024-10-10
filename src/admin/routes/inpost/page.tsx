import { RouteConfig } from "@medusajs/admin"
import { useAdminCustomQuery } from "medusa-react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Container, Table, IconButton } from "@medusajs/ui"
import { ArrowDownCircle } from "@medusajs/icons"

const InpostShipmentsPage = () => {
  let [searchParams, setSearchParams] = useSearchParams()

  const params = Object.fromEntries(searchParams.entries())

  const { data, isLoading, isError, refetch, isRefetching } =
    useAdminCustomQuery(`/inpost/shipments`, ["shipments"], params)

  const navigate = useNavigate()

  if (isLoading) {
    return <Container>Loading...</Container>
  }

  if (isError) {
    return <Container>Error</Container>
  }

  const {
    items: shipments,
    count: shipmentsCount,
    per_page: perPage,
    page,
  } = data

  const updatePage = (delta: number) => {
    const updatedParams = new URLSearchParams(searchParams)
    const currentPage = parseInt(params?.page) || 1

    updatedParams.set("page", (currentPage + delta).toString())
    setSearchParams(updatedParams)
  }

  const previousPage = () => updatePage(-1)
  const nextPage = () => updatePage(1)

  return (
    <Container>
      <div className="flex justify-between mb-2">
        <h1 className="inter-large-semibold">Inpost Shipments</h1>

        <IconButton
          variant="transparent"
          onClick={() => refetch()}
          isLoading={isRefetching}
        >
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
            const date = new Date(shipment.created_at)

            return (
              <Table.Row
                key={shipment.id}
                className="cursor-pointer"
                onClick={() => navigate(`${shipment.id}`)}
              >
                <Table.Cell>{shipment.id}</Table.Cell>
                <Table.Cell>{shipment.status}</Table.Cell>
                <Table.Cell>{shipment.receiver.email}</Table.Cell>
                <Table.Cell>{date.toLocaleString()}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>

      <Table.Pagination
        count={shipmentsCount}
        pageSize={perPage}
        pageIndex={page - 1}
        pageCount={Math.ceil(shipmentsCount / perPage)}
        canPreviousPage={page > 1}
        canNextPage={page < Math.ceil(shipmentsCount / perPage)}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </Container>
  )
}

export const config: RouteConfig = {
  link: {
    label: "Inpost Shipments",
  },
}

export default InpostShipmentsPage
