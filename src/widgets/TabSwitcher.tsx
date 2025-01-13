import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

interface TabSwitcherProps {
  tabs: { label: string; id: number }[]
  items: React.ReactNode[]
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const TabSwitcher = ({ tabs, items }: TabSwitcherProps) => {
  const [value, setValue] = React.useState(0)

  // eslint-disable-next-line
  // @ts-ignore
  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map(({ label, id }) => (
            <Tab key={id} label={label} {...a11yProps(id)} />
          ))}
        </Tabs>
      </Box>
      {items?.map((item, ind) => (
        <CustomTabPanel value={value} index={ind}>
          {item}
        </CustomTabPanel>
      ))}
    </Box>
  )
}

export default TabSwitcher
