import { Box, Button } from '@mui/material'
import { getSearchParams } from '@utils'
import Table, { getTableProps } from '@widgets/Table'
import { Link, useSearchParams } from 'react-router-dom'

const someImage =
  'https://bigseventravel.com/wp-content/uploads/2019/07/62534608_449458172549390_9203865442152611840_o-1920x1280.jpg'

const SpotsTable = () => {
  const [, setParams] = useSearchParams()
  const searchParams = getSearchParams<any>()

  return (
    <Box width="100%">
      <Table.Filters>
        <Table.Search name="keyword" defaultValue={searchParams.keyword} />
        <Table.DropdownFilter
          items={[{ label: 'Ratis Bar', value: 'ratis bari' }]}
          label="Spot Name"
          name="spotName"
        />
        <Table.DropdownFilter
          items={[{ label: 'Tbilisi', value: 'Tbilisi' }]}
          label="Spot Address"
          name="spotAddress"
        />
        <Table.ResetFilter />
      </Table.Filters>
      <Table
        {...getTableProps({
          pageInfo: {
            current_page: 1,
            last_page: 1,
            per_page: 10,
            total: 1,
          },
          loading: false,
          onPagination: ({ paginate, page }) => {
            setParams(params => {
              params.set('page', String(page))
              params.set('paginate', String(paginate))
              return params
            })
          },
          rows: [
            {
              spotName: 'Ratis Bar',
              spotAddress: 'Tbilisi',
              spotImage: '',
              spotNumber: '555222333',
              spotEmail: 'RatisBar@gmail.com',
            },
          ],
          columns: [
            { Header: 'Spot Name', accessor: 'spotName' },
            { Header: 'Spot Address', accessor: 'spotAddress' },
            {
              Header: 'Spot Image',
              accessor: 'spotImage',
              Cell: ({ value }) => (
                <Box
                  component="img"
                  width={100}
                  height={60}
                  src={(value as string) || someImage}
                  alt={value as string}
                />
              ),
            },
            {
              Header: 'Spot Number',
              accessor: 'spotNumber',
              Cell: ({ value }) => (
                <Link to={`tel:${value as string}`}>{value as string}</Link>
              ),
            },
            {
              Header: 'Spot Email',
              accessor: 'spotEmail',
              Cell: ({ value }) => (
                <Link to={`mailto:${value as string}`}>{value as string}</Link>
              ),
            },
            {
              Header: 'Action',
              accessor: 'action',
              Cell: () => {
                return <Button variant="contained">Details</Button>
              },
            },
          ],
        })}
      />
    </Box>
  )
}

export default SpotsTable
