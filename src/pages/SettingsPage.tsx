import { useThemeMode } from '@context/MuiThemeContext/MuiThemeContext'
import { MoonIcon, SunIcon } from '@icons'
import { Box, Button, styled } from '@mui/material'

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
})

const SettingsPage = () => {
  const { toggleThemeMode, mode } = useThemeMode()

  return (
    <div>
      <Button
        variant="contained"
        color="error"
        size="large"
        onClick={toggleThemeMode}
      >
        {mode === 'light' ? (
          <StyledBox>
            Dark Mode
            <MoonIcon />
          </StyledBox>
        ) : (
          <StyledBox>
            Light Mode
            <SunIcon />
          </StyledBox>
        )}
      </Button>
    </div>
  )
}

export default SettingsPage
