// import { useUser } from '@features/auth/useUser'
// import { Box, styled, Typography } from '@mui/material'
// import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications'
// import MarkunreadIcon from '@mui/icons-material/Markunread'
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
// import PersonIcon from '@mui/icons-material/Person'
// import { IUser } from '@rootTypes'
// import { format } from 'date-fns'
// import Loading from '@widgets/Loading'
// import React from 'react'

// const StyledTypography = styled(Typography)({
//   display: 'flex',
//   alignItems: 'center',
//   gap: 2,
// })

// const UsersInformation = () => {
//   const { data, loading } = useUser()

//   const { created_at, email, id, roles, username } = data as IUser
//   const createdAt = created_at ? new Date(created_at) : null

//   if (!id) return null

//   return (
//     <React.Fragment>
//       {!loading ? (
//         <Box>
//           <StyledTypography>Username: {username}</StyledTypography>
//           <StyledTypography>
//             <PersonIcon /> Role: {roles}
//           </StyledTypography>
//           <StyledTypography>
//             <CalendarMonthIcon /> {format(createdAt as Date, 'MM-dd-yyyy')}
//           </StyledTypography>
//           <StyledTypography>
//             <MarkunreadIcon /> {email ?? 'No Email'}
//           </StyledTypography>
//           <StyledTypography>
//             <CircleNotificationsIcon /> 0 Notification
//           </StyledTypography>
//         </Box>
//       ) : (
//         <Loading />
//       )}
//     </React.Fragment>
//   )
// }

// export default UsersInformation
