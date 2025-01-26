import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'

interface TabSwitcherProps {
  tabs: { label: string; id: number; link: string }[]
  activeTab: number
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const TabSwitcher = ({ tabs, activeTab }: TabSwitcherProps) => {
  const [value, setValue] = useState<number>(() => activeTab)
  const navigate = useNavigate()

  // eslint-disable-next-line
  // @ts-ignore
  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    if (tabs.length > 0) navigate(tabs[newValue].link)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        {tabs.map(({ label, id }) => (
          <Tab
            key={id}
            label={label}
            {...a11yProps(id)}
            sx={{ fontWeight: 500 }}
          />
        ))}
      </Tabs>
    </Box>
  )
}

export default TabSwitcher
