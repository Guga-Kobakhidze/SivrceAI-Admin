import { theme } from '@theme'
import { ThemeProvider } from '@mui/material'
import { PropsWithChildren } from 'react'

const MuiThemeProvider = ({ children }: PropsWithChildren) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default MuiThemeProvider
