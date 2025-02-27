import { useThemeMode } from '@context/MuiThemeContext/MuiThemeContext'

const SettingsPage = () => {
  const { toggleThemeMode } = useThemeMode()

  return (
    <div>
      <button onClick={toggleThemeMode}>click</button>
    </div>
  )
}

export default SettingsPage
