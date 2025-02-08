import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import Icon from '@mui/material/Icon'
import moment from 'moment'
import Typography from '@mui/material/Typography'
import DropdownMenu from '@widgets/DropdownMenu'
import { Box } from '@mui/material'
import { HStack } from '@widgets/Stack'
import { Calendar } from 'react-date-range'
import { useState } from 'react'
import { ArrowDown } from '@icons'
import { getSearchParams } from '@utils'
import { useSearchParams } from 'react-router-dom'
import { TableFilterProps } from '../Table.config'

const formatDate = (d: Date) => moment(d).format('YYYY-MM-DD')

export const TableDatePicker: React.FC<
  TableFilterProps<{ date: string }, { label: string }>
> = ({ sx, label, name, isToday }) => {
  const [, setParams] = useSearchParams()
  const searchParams = getSearchParams<any>()
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    searchParams[name] ? new Date(searchParams[name]) : null,
  )

  const handleDateChange = (date: Date) => {
    const formattedDate = formatDate(date)
    setSelectedDate(date)
    setParams(prevParams => {
      prevParams.set(name, formattedDate)
      return prevParams
    })
  }

  const handleClearFilter = () => {
    setParams(prevParams => {
      prevParams.delete(name)
      return prevParams
    })
    setSelectedDate(today)
  }

  return (
    <DropdownMenu
      target={
        <HStack
          gap={2}
          sx={{
            cursor: 'pointer',
            border: '1px solid #D5D5D5',
            height: '97%',
            paddingX: '20px',
            borderRadius: 0,
            ...sx,
            borderLeft: 0,
          }}
        >
          <Typography fontSize="small" fontWeight="bold" whiteSpace="nowrap">
            {searchParams[name] || label}
          </Typography>
          <Icon>
            <ArrowDown sx={{ mb: 0.3 }} />
          </Icon>
        </HStack>
      }
    >
      <Box onClick={e => e.stopPropagation()}>
        <Calendar
          date={selectedDate || (isToday ? today : undefined)}
          onChange={handleDateChange}
          maxDate={isToday ? today : undefined}
        />
      </Box>

      <DropdownMenu.Item onClick={handleClearFilter}>
        <Typography color="error">Clear filter</Typography>
      </DropdownMenu.Item>
    </DropdownMenu>
  )
}
