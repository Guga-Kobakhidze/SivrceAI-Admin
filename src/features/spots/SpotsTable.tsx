import Table, { getTableProps } from '@widgets/Table'
import Loading from '@widgets/Loading'
import NoDataFound from '@widgets/NoDataFound'
import { ROUTES } from '@constants'
import { getCapitalize } from '@helpers'
import { ISpotResponse } from './Spots.config'
import { Box, Button, Typography } from '@mui/material'
import { QuestionsFilters, useSpots } from './useSpots'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { extractPageAndSize, getSearchParams } from '@utils'
import {
  CityEnum,
  DistrictEnum,
  CategoryEnum,
  PriceRangeEnum,
  PeopleRangeEnum,
} from '@enums'

const someImage =
  'https://bigseventravel.com/wp-content/uploads/2019/07/62534608_449458172549390_9203865442152611840_o-1920x1280.jpg'

const SpotsTable = () => {
  const navigate = useNavigate()
  const [, setParams] = useSearchParams()
  const searchParams = getSearchParams<QuestionsFilters>()
  const pagination = extractPageAndSize(searchParams)

  const { spots, isLoading, error, pageInfo } = useSpots({
    ...searchParams,
    ...pagination,
  })

  if (error) return <NoDataFound />

  return (
    <Box width="100%">
      <Table.Filters>
        <Table.Search name="keyword" defaultValue={searchParams.keyword} />
        <Table.DropdownFilter
          items={Object.values(CityEnum).map(item => ({
            label: getCapitalize(item),
            value: item,
          }))}
          label="Spot City"
          name="city"
        />
        <Table.DropdownFilter
          items={Object.values(DistrictEnum).map(item => ({
            label: getCapitalize(item),
            value: item,
          }))}
          label="Spot District"
          name="districts"
        />
        <Table.DropdownFilter
          items={Object.values(CategoryEnum).map(item => ({
            label: getCapitalize(item),
            value: item,
          }))}
          label="Categories"
          name="categories"
        />
        <Table.DropdownFilter
          items={Object.values(PeopleRangeEnum).map(item => ({
            label: getCapitalize(item),
            value: item,
          }))}
          label="People Range"
          name="people_range"
        />
        <Table.DropdownFilter
          items={Object.values(PriceRangeEnum).map(item => ({
            label: getCapitalize(item),
            value: item,
          }))}
          label="Price Range"
          name="price_range"
        />

        <Table.ResetFilter />
      </Table.Filters>
      {!isLoading ? (
        <Table
          {...getTableProps({
            pageInfo,
            loading: false,
            onPagination: ({ size, page }) => {
              setParams(params => {
                params.set('page', String(page))
                params.set('size', String(size))
                return params
              })
            },
            rows: spots?.map(
              ({
                id,
                name,
                email,
                website,
                address,
                phone,
                image,
              }: ISpotResponse) => ({
                id,
                name,
                email,
                website,
                address,
                phone,
                image,
              }),
            ),
            columns: [
              { Header: 'Spot Name', accessor: 'name' },
              {
                Header: 'Spot Address',
                accessor: 'address',
                Cell: ({ value }) => (
                  <Typography>
                    {typeof value === 'string' && value.slice(0, 40)}
                  </Typography>
                ),
              },
              {
                Header: 'Spot Image',
                accessor: 'image',
                Cell: ({ value }) => {
                  const isValidImage =
                    value &&
                    typeof value === 'string' &&
                    value.startsWith('http')

                  if (!isValidImage) {
                    return (
                      <Box
                        component="img"
                        width={100}
                        height={60}
                        src={someImage}
                        alt="Fallback"
                      />
                    )
                  }
                  return (
                    <Box
                      component="img"
                      width={100}
                      height={60}
                      src={value as string}
                      alt={value as string}
                    />
                  )
                },
              },
              {
                Header: 'Spot Number',
                accessor: 'phone',
                Cell: ({ value }) => (
                  <Link to={`tel:${value as string}`}>{value as string}</Link>
                ),
              },
              {
                Header: 'Spot Email',
                accessor: 'email',
                Cell: ({ value }) => (
                  <Link to={`mailto:${value as string}`}>
                    {(value as string) ?? 'No Email address'}
                  </Link>
                ),
              },
              {
                Header: 'Action',
                accessor: 'action',
                Cell: ({ row }) => {
                  return (
                    <Button
                      onClick={() => navigate(`${ROUTES.editSpot}/${row.id}`)}
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
      ) : (
        <Loading />
      )}
    </Box>
  )
}

export default SpotsTable
