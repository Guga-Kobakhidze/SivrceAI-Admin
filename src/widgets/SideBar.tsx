import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import MainNav from './MainNav'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={({ spacing, palette }) => ({
        gridRow: '1 / -1',
        p: `${spacing(2)} ${spacing(2)}`,
        backgroundColor: palette.text.primary,
      })}
    >
      <Box sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        <Typography mb={5} fontSize={22} fontWeight={700} color="#4880ff">
          Sivrce Admin Panel
        </Typography>
      </Box>
      <MainNav />
    </Box>
  )
}

export default Sidebar
