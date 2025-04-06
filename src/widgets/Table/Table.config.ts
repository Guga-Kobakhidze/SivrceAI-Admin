import { ButtonProps, SxProps } from '@mui/material'
import {
  Action,
  PageInfo,
  OnChangeParams as OnPaginationChangeParams,
} from '@rootTypes'

export type TableFilterProps<T, E = object> = {
  onChange?: (arg: T) => void
  name: string
  sx?: SxProps
  isToday?: boolean
} & E

export type Data<T extends string = string> = Record<T, unknown>

export type Column<T extends string = string> = {
  accessor: T
  Header: string
  minWidth?: number
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  format?: (value: unknown) => string
  Cell?:
    | React.FC<{ row: Data<T>; value: unknown; onClick?: () => void }>
    | undefined
  hidden?: boolean
}

export type TableAction<T extends string = string> = Pick<
  Action,
  'label' | 'disabled'
> & {
  execute: (row: Data<T>, index: number) => void
  color?: ButtonProps['color']
}

export type TablePageInfo = PageInfo

export type TableProps<T extends string = string, K extends T = T> = {
  columns: Column<K | any>[]
  rows: Data<T>[]
  pageInfo?: TablePageInfo
  actions?:
    | (TableAction<T> | ((row: Data<T>, index: number) => TableAction<T>))[]
    | undefined
  loading?: boolean | undefined
  onPagination: (arg: OnPaginationChangeParams) => void
}
