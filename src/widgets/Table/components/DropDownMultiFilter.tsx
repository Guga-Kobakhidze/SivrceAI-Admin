import Icon from '@mui/material/Icon'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TableFilterProps } from '../Table.config'
import { getSearchParams } from '@utils'
import DropdownMenu from '@widgets/DropdownMenu'
import { HStack } from '@widgets/Stack'
import { ArrowDown } from '@icons'

export const DropdownMultiFilter = ({
  label,
  items = [],
  name,
  extraSetParams,
  sx = {},
}: TableFilterProps<string> & {
  label: string
  items: { label: string; value: string }[] | undefined
  extraSetParams?: (params: URLSearchParams) => void
}) => {
  const [params, setParams] = useSearchParams()
  const searchParams = getSearchParams<any>()
  const selectedValues = useMemo(
    () => searchParams[name]?.split(',') || [],
    [searchParams, name],
  )

  const toggleValue = useCallback(
    (value: string) => {
      const updated = selectedValues.includes(value)
        ? selectedValues?.filter((v: string) => v !== value)
        : [...selectedValues, value]

      setParams(prev => {
        prev.set(name, updated.join(','))
        extraSetParams?.(prev)
        return prev
      })
    },
    [selectedValues, name, setParams, extraSetParams],
  )

  const clearFilter = useCallback(() => {
    setParams(prev => {
      prev.delete(name)
      return prev
    })
  }, [name, setParams])

  const filteredItems = useMemo(() => {
    const term = params.get(`${name}_search`)?.toLowerCase() || ''
    return items.filter(item => item.label?.toLowerCase().includes(term))
  }, [items, params, name]).slice(0, 20)

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setParams(prev => {
        prev.set(`${name}_search`, e.target.value)
        return prev
      })
    },
    [name, setParams],
  )

  return (
    <DropdownMenu
      target={
        <HStack
          gap={2}
          sx={{
            cursor: 'pointer',
            border: '1px solid #D5D5D5',
            height: '100%',
            paddingX: '20px',
            borderRadius: 0,
            ...sx,
            borderLeft: 0,
          }}
        >
          <Typography
            fontSize="small"
            fontWeight="bold"
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </Typography>
          <Icon>
            <ArrowDown />
          </Icon>
        </HStack>
      }
    >
      <div
        style={{
          width: '250px',
          overflowY: 'auto',
          padding: '8px 0 0',
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          fullWidth
          sx={{ mb: 1 }}
          value={params.get(`${name}_search`) || ''}
          onChange={handleSearchChange}
          onClick={e => e.stopPropagation()}
        />

        <div
          style={{
            maxHeight: '250px',
            overflowY: 'auto',
          }}
        >
          {filteredItems.map(item => {
            const isSelected = selectedValues.includes(item.value)

            return (
              <DropdownMenu.Item
                key={item.value}
                style={{
                  width: '100%',
                  padding: '8px',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={e => {
                  e.stopPropagation()
                  toggleValue(item.value)
                }}
              >
                <Typography
                  sx={{
                    fontWeight: isSelected ? 'bold' : '',
                    color: isSelected ? '#000' : '#3c3c3c',
                  }}
                >
                  {item.label}
                </Typography>
              </DropdownMenu.Item>
            )
          })}
        </div>

        <DropdownMenu.Item
          style={{ width: '100%', paddingLeft: '7px' }}
          onClick={clearFilter}
        >
          <Typography color="error" lineHeight="38px">
            Clear filter
          </Typography>
        </DropdownMenu.Item>
      </div>
    </DropdownMenu>
  )
}
