import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import LoginBg from '@assets/login.jpg'
import Logo from '@assets/logo.png'

const AuthLayout = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: `url(${LoginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        component="img"
        alt="logo"
        src={Logo}
        width={60}
        height={60}
        position="absolute"
        right="40px"
        top="40px"
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
