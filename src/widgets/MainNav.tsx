import React, { PropsWithChildren } from 'react'
import { ROUTES } from '@constants'
import { NavLink } from 'react-router-dom'
import { CoursesIcon, HomeIcon, SettingsIcon, UserManagementIcon } from '@icons'
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material'

const StyledNavLink = styled(NavLink)(() => ({
  color: '#fff',
  textDecoration: 'none',
  '.MuiSvgIcon-root': { color: '#fff' },
  '.MuiListItemButton-root': { borderRadius: '12px' },
  '&:hover > .MuiListItemButton-root': {
    background: '#4880ff',
  },
  '&.active > .MuiListItemButton-root': {
    background: '#4880ff',
  },
}))

type Name = string
type Route = string
type Icon = React.ReactElement
type NavItem = readonly [Name, Icon, Route, [Name, Route][]?]

const NavItems: Readonly<NavItem[]> = [
  ['Spots', <CoursesIcon key="Spots" />, ROUTES.spotsTable],
  [
    'Interior Design',
    <HomeIcon key="Interior" />,
    ROUTES.interiorQuestionTable,
  ],
  ['User Management', <UserManagementIcon key="User" />, ROUTES.usersPage],
  ['Settings', <SettingsIcon key="settings" />, ROUTES.settings],
]

const MainNav = () => {
  return (
    <List component="nav">
      {NavItems.map((item, idx) => (
        <Box mb={0.5} key={idx}>
          <NavItem item={item} />
        </Box>
      ))}
    </List>
  )
}

const NavItem: React.FC<{ item: NavItem }> = ({ item }) => {
  const [name, icon, route, children] = item

  // Link without child routes
  if (!children) {
    ;<StyledNavLink end to={route}>
      <SimpleNavItem name={name} icon={icon} />
    </StyledNavLink>
  }

  // Dropdown link
  const ListItem = <SimpleNavItem name={name} icon={icon} />

  return (
    <React.Fragment>
      {route ? <StyledNavLink to={route}>{ListItem}</StyledNavLink> : ListItem}
      {children ? (
        <Collapse timeout="auto" unmountOnExit>
          <List component="ul" disablePadding>
            {children.map(([name, childRoute], idx) => (
              <StyledNavLink to={`${route}${childRoute}`} key={idx}>
                <ListItemButton sx={{ pl: ({ spacing }) => spacing(9) }}>
                  <ListItemText secondary={name} />
                </ListItemButton>
              </StyledNavLink>
            ))}
          </List>
        </Collapse>
      ) : null}
    </React.Fragment>
  )
}

const SimpleNavItem: React.FC<
  PropsWithChildren<{ name: Name; icon: Icon }>
> = ({ name, icon, children }) => {
  return (
    <ListItemButton
      sx={{
        '&:hover': {
          color: 'white',
          '& .MuiListItemIcon-root, & .MuiTypography-root': {
            color: 'white',
          },
        },
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={name} />
      {children}
    </ListItemButton>
  )
}

export default MainNav
