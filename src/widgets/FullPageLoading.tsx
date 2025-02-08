import { Box, keyframes } from '@mui/material'
import loaderLogo from '@assets/logo.png'

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  
  50% {
    transform: scale(0.9);
  }
`

const FullPageLoading = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        bgcolor: '#27262C',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          animation: `${pulse} 1s linear infinite`,
        }}
        component="img"
        src={loaderLogo}
        alt="Loader Logo"
        width={60}
      />
    </Box>
  )
}

export default FullPageLoading
