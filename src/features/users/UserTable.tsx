import { ROUTES } from '@constants'
import { Box, Button, Typography } from '@mui/material'
import Table, { getTableProps } from '@widgets/Table'
import { Link, useNavigate } from 'react-router-dom'
import { getStatusOption, StatusType } from './helpers/helpers'
import React from 'react'

const fakeData = [
  {
    id: 1,
    name: 'Gugas Bar',
    email: 'dadscscs@gmail.com',
    spotOwner: 'Guga Kobakhidze',
    status: 'pending',
  },
  {
    id: 2,
    name: 'Akaki Restaurant',
    email: 'akaki@gmail.com',
    spotOwner: 'Akaki Gakhokidze',
    status: 'accepted',
  },
  {
    id: 3,
    name: 'Ninuca sushi',
    email: 'ninuca@gmail.com',
    spotOwner: 'Ninuca  khurtsidze',
    status: 'rejected',
  },
]

const UserTable = () => {
  const navigate = useNavigate()

  return (
    <React.Fragment>
      <Table
        {...getTableProps({
          sx: { minHeight: 'fit-content' },
          loading: false,
          rows: fakeData?.map(({ id, name, email, spotOwner, status }) => ({
            id,
            name,
            spotOwner,
            email,
            status,
          })),
          columns: [
            { Header: 'Spot Name', accessor: 'name' },
            {
              Header: 'Status',
              accessor: 'status',
              minWidth: 100,
              Cell: ({ value }) => {
                const { bgColor, title } = getStatusOption(value as StatusType)
                return (
                  <Box
                    sx={{
                      bgcolor: bgColor,
                      p: '2px 4px',
                      borderRadius: '20px',
                      maxWidth: '80px',
                    }}
                  >
                    <Typography textAlign="center" fontSize={12} color="#fff">
                      {title as string}
                    </Typography>
                  </Box>
                )
              },
            },
            {
              Header: 'Spot Owner',
              accessor: 'spotOwner',
              Cell: ({ value }) => (
                <Typography>
                  {typeof value === 'string' && value.slice(0, 40)}
                </Typography>
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
              Header: 'Actions',
              accessor: 'action',
              Cell: ({ row }) => {
                return (
                  <Box display="flex" gap={1} width="100%">
                    <Button
                      fullWidth
                      onClick={() => navigate(`${ROUTES.editSpot}/${row.id}`)}
                      variant="contained"
                    >
                      Show Details
                    </Button>
                    <Button
                      fullWidth
                      onClick={() => navigate(`${ROUTES.editSpot}/${row.id}`)}
                      variant="contained"
                      color="success"
                    >
                      Accept
                    </Button>
                    <Button
                      fullWidth
                      onClick={() => navigate(`${ROUTES.editSpot}/${row.id}`)}
                      variant="contained"
                      color="error"
                    >
                      Reject
                    </Button>
                  </Box>
                )
              },
            },
          ],
        })}
      />
    </React.Fragment>
  )
}

export default UserTable
