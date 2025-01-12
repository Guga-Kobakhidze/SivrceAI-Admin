import React, { PropsWithChildren, useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { PopoverOrigin } from '@mui/material'

type DropdownMenuProps = PropsWithChildren<{
  target: React.ReactElement
  anchorOrigin?: PopoverOrigin
  width?: string
}>

const DropdownMenu = ({
  width,
  target: Target,
  anchorOrigin = { horizontal: 'left', vertical: 'bottom' },
  children,
}: DropdownMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      {React.cloneElement(Target, {
        onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          event.stopPropagation()
          handleMenu(event)
        },
      })}
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          sx: {
            minWidth: width ?? '14em',
            maxHeight: '40em',
          },
        }}
      >
        <div>{children}</div>
      </Menu>
    </div>
  )
}

DropdownMenu.Item = MenuItem

export default DropdownMenu
