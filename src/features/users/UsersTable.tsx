import Table, { getTableProps } from '@widgets/Table'
import { getSearchParams } from '@utils'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'

const IS_USER_ACTIVE = [
  { label: 'Active', value: '0' },
  { label: 'Inactive', value: '1' },
]

const UsersTable = () => {
  const [users, setUsers] = useState([])
  const [, setParams] = useSearchParams()
  const searchParams = getSearchParams<any>()

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch('/data/users.json')
        if (!res.ok) throw new Error('no daataa')
        const data = await res.json()
        setUsers(data)
      } catch (error) {
        console.log(error)
      }
    }

    getUsers()
  }, [])

  return (
    <Box width="100%">
      <Table.Filters>
        <Table.Search name="keyword" defaultValue={searchParams.keyword} />
        <Table.DropdownFilter
          name="Names"
          label="Names"
          items={users.map((user: any) => ({
            value: user.name,
            label: user.name,
          }))}
        />
        <Table.DropdownFilter
          name="isActive"
          label="Position"
          items={IS_USER_ACTIVE.map((user: any) => ({
            value: user.value,
            label: user.label,
          }))}
        />
        <Table.DatePicker name="date" label="Date" />
        <Table.ResetFilter />
      </Table.Filters>
      <Table
        {...getTableProps({
          pageInfo: {
            current_page: 1,
            last_page: 1,
            per_page: 10,
            total: users.length,
          },
          loading: false,
          onPagination: ({ paginate, page }) => {
            setParams(params => {
              params.set('page', String(page))
              params.set('paginate', String(paginate))
              return params
            })
          },
          rows: users.map(({ name, lastName, role, email, age, isActive }) => ({
            age,
            name,
            role,
            email,
            lastName,
            isActive,
          })),
          columns: [
            { Header: 'First Name', accessor: 'name' },
            { Header: 'Last Name', accessor: 'lastName' },
            { Header: 'Role', accessor: 'role' },
            {
              Header: 'Age',
              accessor: 'age',
              Cell: ({ value }) => (
                <Typography>{value as string} Years old</Typography>
              ),
            },
            {
              Header: 'Email',
              accessor: 'email',
              Cell: ({ value }) => (
                <Link style={{ textDecoration: 'none' }} to={`mailto:${value}`}>
                  {value as string}
                </Link>
              ),
            },
            {
              Header: 'Position',
              accessor: 'isActive',
              Cell: ({ value }) => (
                <Box
                  pr={3}
                  py={0.8}
                  color={value ? '#2c932c' : '#7d1818'}
                  borderRadius="10px"
                  textAlign="start"
                >
                  <Typography fontSize={16} fontWeight={700}>
                    {value ? 'Active' : 'Inactive'}
                  </Typography>
                </Box>
              ),
            },
            {
              Header: 'Action',
              accessor: 'action',
              Cell: () => (
                <Button
                  variant="contained"
                  onClick={() => console.log('hello')}
                >
                  Details
                </Button>
              ),
            },
          ],
        })}
      />
    </Box>
  )
}

export default UsersTable
