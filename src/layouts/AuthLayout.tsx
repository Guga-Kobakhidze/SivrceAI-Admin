import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          position: 'absolute',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          zIndex: 1,
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '30em',
        }}
      >
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default AuthLayout
