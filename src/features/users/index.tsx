import { Box } from '@mui/material'
import UsersTable from './UsersTable'
import Actions from '@widgets/Actions'
import { ROUTES } from '@constants'
import { AddIcon, DownloadIcon } from '@icons'

const Users = () => {
  return (
    <Box>
      <Actions
        title="Users"
        toolbars={[
          {
            to: ROUTES.createUser,
            title: 'Create User',
            color: 'primary',
            icon: <AddIcon />,
            variant: 'contained',
          },
          {
            title: 'Export',
            color: 'success',
            icon: <DownloadIcon />,
            variant: 'contained',
          },
        ]}
      />
      <UsersTable />
    </Box>
  )
}

export default Users
