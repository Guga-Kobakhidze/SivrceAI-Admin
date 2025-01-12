import Box from '@mui/material/Box'
import LogoIcon from '@assets/logo.png'

type LogoProps = {
  onClick?: () => void
}
const Logo: React.FC<LogoProps> = ({ onClick }) => {
  return (
    <Box onClick={onClick} sx={{ display: 'inline-block', cursor: 'pointer' }}>
      <Box component="img" src={LogoIcon} alt="logo" width={30} height={30} />
    </Box>
  )
}

export default Logo
