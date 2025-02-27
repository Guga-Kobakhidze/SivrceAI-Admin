import { PaletteMode } from '@mui/material'
import { ThemeProvider } from '@mui/material'
import { theme } from '@theme'
import { getThemeMode, setThemeMode } from '@utils'
import {
  useMemo,
  useState,
  useContext,
  useCallback,
  createContext,
  PropsWithChildren,
} from 'react'

type ThemeContextType = {
  mode: 'light' | 'dark'
  toggleThemeMode: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
)

export const MuiThemeProvider = ({ children }: PropsWithChildren) => {
  const { themeMode } = getThemeMode().orDefault({ themeMode: 'light' })
  const [mode, setMode] = useState<PaletteMode>(themeMode as PaletteMode)

  const toggleThemeMode = useCallback(() => {
    const currentMode = mode === 'light' ? 'dark' : 'light'
    setMode(currentMode)
    setThemeMode(currentMode)
  }, [mode])

  const modifiedTheme = theme

  const value = useMemo(() => {
    return {
      mode,
      toggleThemeMode,
    }
  }, [mode, toggleThemeMode])

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={modifiedTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeMode = () => {
  const context = useContext(ThemeContext)
  if (!context)
    throw new Error('useThemeMode is used outside the ThemeContext Provider')

  return context
}
