import SpotsTable from '@features/spots'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const SpostsPage = () => {
  return (
    <Box>
      <SpotsTable />
      <Outlet />
    </Box>
  )
}

export default SpostsPage
