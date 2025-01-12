import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import MainNav from './MainNav'

const Sidebar = () => {
  return (
    <Box
      sx={({ spacing }) => ({
        gridRow: '1 / -1',
        p: `${spacing(2)} ${spacing(2)}`,
        backgroundColor: '#111111',
      })}
    >
      <Typography mb={5} fontSize={22} fontWeight={700} color="#4880ff">
        Sivrce Admin Panel
      </Typography>
      <MainNav />
    </Box>
  )
}

export default Sidebar
