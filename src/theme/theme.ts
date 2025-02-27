import { createTheme } from '@mui/material'

const globalStyles = {
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontWeightBold: 600,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
    fontWeightLight: 300,
  },
}

const theme = createTheme({
  ...globalStyles,
  palette: {
    mode: 'light',
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

// const darkTheme = createTheme({
//   ...globalStyles,
//   palette: {
//     mode: 'dark',
//     primary: {
//       main: '#000',
//     },
//     secondary: {
//       main: '#000',
//     },
//     error: {
//       main: '#000',
//     },
//     warning: {
//       main: '#000',
//     },
//     info: {
//       main: '#000',
//     },
//     success: {
//       main: '#000',
//     },
//     text: {
//       primary: '#000',
//       secondary: '#000',
//     },
//   },
// })

export { theme }
