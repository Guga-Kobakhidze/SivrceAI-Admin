import { UserOverview } from '@components'
import { Box, Grid2 } from '@mui/material'
import LineChart from './UserChart'
import UserTable from './UserTable'

const UserDashboard = () => {
  return (
    <Box width="100%">
      <Grid2 container spacing={4} mb={4}>
        <UserOverview precent={56} title="Views" activity={250} />
        <UserOverview precent={70} title="Visits" activity={2000} />
        <UserOverview precent={45} title="New Users" activity={23} />
        <UserOverview precent={40} title="Active Users" activity={25} />
      </Grid2>
      <Grid2 container spacing={4} mb={4}>
        <Grid2 size={8}>
          <LineChart />
        </Grid2>
        <Grid2 size={4}>{/* <UsersInformation /> */}</Grid2>
      </Grid2>
      <Grid2 container>
        <Grid2 size={12}>
          <UserTable />
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default UserDashboard
