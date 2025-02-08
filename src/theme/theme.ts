import { createTheme } from '@mui/material'

export const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontWeightBold: 600,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
    fontWeightLight: 300,
  },
  palette: {
    primary: {
      main: '#3172b3',
    },
    secondary: {
      main: '#ff4081',
    },
    error: {
      main: '#9d3232',
    },
    warning: {
      main: '#ffa000',
    },
    info: {
      main: '#0288d1',
    },
    success: {
      main: '#337136',
    },
    text: {
      primary: '#27262C',
      secondary: '#555555',
    },
  },
})
