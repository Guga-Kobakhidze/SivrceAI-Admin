import Icon from '@mui/material/Icon'
import Typography from '@mui/material/Typography'
import DropdownMenu from '@widgets/DropdownMenu'
import { HStack } from '@widgets/Stack'
import { ArrowDown } from '@icons'
import { useSearchParams } from 'react-router-dom'
import { getSearchParams } from '@utils'
import { TableFilterProps } from '../Table.config'

export const DropdownFilter = ({
  label,
  items,
  name,
  extraSetParams,
  sx = {},
}: TableFilterProps<string> & {
  selected?: string | undefined
  label: string
  items: { label: string; value: string }[] | undefined
  extraSetParams?: (params: URLSearchParams) => void
}) => {
  const [, setParams] = useSearchParams()

  const searchParams = getSearchParams<any>()
  const title =
    searchParams[name] && items && items.length > 0
      ? items.find(el => el.value === searchParams[name])!.label
      : label

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
            borderLeft: 0,
            ...sx,
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
            {title}
          </Typography>
          <Icon>
            <ArrowDown sx={{ mb: 0.3 }} />
          </Icon>
        </HStack>
      }
    >
      {items?.map((item, idx) => (
        <DropdownMenu.Item
          onClick={() => {
            setParams(params => {
              params.set(name, item.value)
              extraSetParams?.(params)
              return params
            })
          }}
          key={idx}
        >
          {item.label}
        </DropdownMenu.Item>
      ))}

      <DropdownMenu.Item
        onClick={() => {
          setParams(prev => {
            prev.delete(name)
            return prev
          })
        }}
      >
        <Typography color="error">Clear filter</Typography>
      </DropdownMenu.Item>
    </DropdownMenu>
  )
}
