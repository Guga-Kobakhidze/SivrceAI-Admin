import Table, { getTableProps } from '@widgets/Table'
import { getSearchParams } from '@utils'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import { useUsers } from './useUsers'
import { format } from 'date-fns'
import Loading from '@widgets/Loading'

const Roles = [
  { label: 'Super admin', value: 'superAdmin' },
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Partner', value: 'partner' },
]

const UsersTable = () => {
  const navigate = useNavigate()
  const [, setParams] = useSearchParams()
  const searchParams = getSearchParams<any>()

  const { users, isLoading } = useUsers({
    ...searchParams,
  })

  return (
    <Box width="100%">
      <Table.Filters>
        <Table.Search name="keyword" defaultValue={searchParams.keyword} />
        <Table.DropdownFilter
          name="username"
          label="Username"
          items={users?.map((user: any) => ({
            value: user.username,
            label: user.username,
          }))}
        />
        <Table.DropdownFilter
          name="roles"
          label="Roles"
          items={Roles.map((user: any) => ({
            value: user.value,
            label: user.label,
          }))}
        />
        <Table.DatePicker name="date" label="Created At" />
        <Table.ResetFilter />
      </Table.Filters>
      {!isLoading ? (
        <Table
          {...getTableProps({
            pageInfo: {
              current_page: 1,
              last_page: 1,
              per_page: 10,
              total: users.length,
            },
            loading: false,
            onPagination: ({ size, page }) => {
              setParams(params => {
                params.set('page', String(page))
                params.set('size', String(size))
                return params
              })
            },
            rows: users.map(({ created_at, email, id, roles, username }) => ({
              id,
              email,
              username,
              created_at,
              roles: roles[0],
            })),
            columns: [
              {
                Header: 'Created At',
                accessor: 'created_at',
                Cell: ({ value }) => (
                  <Typography>{format(value as Date, 'MM-dd-yyyy')}</Typography>
                ),
              },
              { Header: 'Username', accessor: 'username' },
              {
                Header: 'Role',
                accessor: 'roles',
                Cell: ({ value }) => <Typography>{value as string}</Typography>,
              },
              {
                Header: 'Email',
                accessor: 'email',
                Cell: ({ value }) => (
                  <Link
                    style={{ textDecoration: 'none' }}
                    to={`${value ? `mailto:${value}` : ''}`}
                  >
                    {(value as string) ?? 'No Email'}
                  </Link>
                ),
              },
              {
                Header: 'Action',
                accessor: 'action',
                Cell: ({ row }) => {
                  return (
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/${row.id}`)}
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

export default UsersTable
