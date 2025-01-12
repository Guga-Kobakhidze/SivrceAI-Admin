import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Grid2 } from '@mui/material'
import Box from '@mui/material/Box'
import Header from '@widgets/Header'
import Sidebar from '@widgets/SideBar'
import FullPageLoading from '@widgets/FullPageLoading'

const AppLayout = () => {
  return (
    <Grid2
      sx={{
        display: 'grid',
        gridTemplateColumns: ({ spacing }) => `${spacing(36)} 1fr`,
        gridTemplateRows: 'auto 1fr',
        height: '100dvh',
      }}
    >
      <Header />
      <Sidebar />
      <Box
        sx={{ overflowY: 'scroll', padding: 3, bgcolor: '#F1F1F1' }}
        id="main-content"
      >
        <Suspense fallback={<FullPageLoading />}>
          <Outlet />
        </Suspense>
      </Box>
    </Grid2>
  )
}

export default AppLayout
