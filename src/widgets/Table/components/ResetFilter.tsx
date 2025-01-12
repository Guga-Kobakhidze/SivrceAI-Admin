import Icon from '@mui/material/Icon'
import Typography from '@mui/material/Typography'
import { HStack } from '@widgets/Stack'
import { ReplayIcon } from '@icons'
import { useSearchParams } from 'react-router-dom'
import { TableFilterProps } from '../Table.config'
import { useTableFiltersContext } from './TableFilters'

export const ResetFilter: React.FC<Pick<TableFilterProps<unknown>, 'sx'>> = ({
  sx = {},
}) => {
  const [, setParams] = useSearchParams()
  const { names } = useTableFiltersContext()

  return (
    <HStack
      onClick={() => {
        setParams(prev => {
          names.forEach(name => prev.delete(name))
          return prev
        })
      }}
      sx={{
        flexShrink: 0,
        cursor: 'pointer',
        border: '1px solid #D5D5D5',
        height: '100',
        borderRadius: 0,
        ...sx,
        borderLeft: 0,
        padding: '18px',
      }}
    >
      <Icon color="error">
        <ReplayIcon sx={{ fontSize: 20 }} />
      </Icon>
      <Typography fontSize={14} color="error.main" fontWeight="bold">
        Reset filters
      </Typography>
    </HStack>
  )
}
