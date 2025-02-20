import Logo from './Logo'
import DropdownMenu from './DropdownMenu'
import { ROUTES } from '@constants'
import { useNavigate } from 'react-router-dom'
import { HEADER_HEIGHT } from '@config'
import { useConfirmDialog } from '@context/ConfirmDialog/ConfirmDialog'
import { AccountIcon, LogoutIcon } from '@icons'
import { AppBar, Box, IconButton, ListItemIcon, Toolbar } from '@mui/material'
import { removeAuthToken } from '@utils'

const Header = () => {
  const navigate = useNavigate()
  const { showConfirmDialog } = useConfirmDialog()

  const onLogout = () => {
    removeAuthToken()
  }

  const logout = () => {
    showConfirmDialog({
      title: 'Log Out',
      buttonType: 'error',
      onSuccess: onLogout,
      cancelLabel: 'Cancel',
      confirmLabel: 'Log out',
      description: 'Are you sure you want to log out?',
    })
  }

  return (
    <AppBar
      position="static"
      sx={({ palette }) => ({
        gridColumn: '2 / -1',
        backgroundColor: palette.common.white,
        borderBottom: `1px solid #E8E8E8`,
        height: HEADER_HEIGHT,
      })}
      elevation={0}
    >
      <Toolbar>
        <Box flexGrow={1}>
          <Logo onClick={() => navigate(ROUTES.usersPage)} />
        </Box>
        <DropdownMenu
          width="10em"
          target={
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="default"
            >
              <AccountIcon />
            </IconButton>
          }
        >
          <DropdownMenu.Item onClick={() => logout()}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            Log out
          </DropdownMenu.Item>
        </DropdownMenu>
      </Toolbar>
    </AppBar>
  )
}

export default Header
