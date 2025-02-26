import Table, { getTableProps } from '@widgets/Table'
import { Box, Button } from '@mui/material'
import { getSearchParams } from '@utils'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  CategoryEnum,
  CityEnum,
  DistrictEnum,
  PeopleRangeEnum,
  PriceRangeEnum,
} from '@enums'

const someImage =
  'https://bigseventravel.com/wp-content/uploads/2019/07/62534608_449458172549390_9203865442152611840_o-1920x1280.jpg'

const SpotsTable = () => {
  const navigate = useNavigate()
  const [, setParams] = useSearchParams()
  const searchParams = getSearchParams<any>()

  return (
    <Box width="100%">
      <Table.Filters>
        <Table.Search name="keyword" defaultValue={searchParams.keyword} />
        <Table.DropdownFilter
          items={Object.values(CityEnum).map(item => ({
            label: item,
            value: item,
          }))}
          label="Spot City"
          name="city"
        />
        <Table.DropdownFilter
          items={Object.values(DistrictEnum).map(item => ({
            label: item,
            value: item,
          }))}
          label="Spot District"
          name="districts"
        />
        <Table.DropdownFilter
          items={Object.values(CategoryEnum).map(item => ({
            label: item,
            value: item,
          }))}
          label="Categories"
          name="categories"
        />
        <Table.DropdownFilter
          items={Object.values(PeopleRangeEnum).map(item => ({
            label: item,
            value: item,
          }))}
          label="People Range"
          name="people_range"
        />
        <Table.DropdownFilter
          items={Object.values(PriceRangeEnum).map(item => ({
            label: item,
            value: item,
          }))}
          label="Price Range"
          name="price_range"
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
          onPagination: ({ size, page }) => {
            setParams(params => {
              params.set('page', String(page))
              params.set('size', String(size))
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
              Cell: ({ row }) => {
                return (
                  <Button
                    onClick={() => navigate(`spots/${row.id}`)}
                    variant="contained"
                  >
                    Details
                  </Button>
                )
              },
            },
          ],
        })}
      />
    </Box>
  )
}

export default SpotsTable
