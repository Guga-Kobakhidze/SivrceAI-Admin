import Button from '@mui/material/Button'
import MuiTable from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import LazyLoading from '@widgets/LazyLoading'
import DropdownMenu from '@widgets/DropdownMenu'
import TablePaginator from '@widgets/TablePaginator'
import TableContainer from '@mui/material/TableContainer'
import { HStack } from '@widgets/Stack'
import { Search } from './components/Search'
import { Box, Paper } from '@mui/material'
import { ResetFilter } from './components/ResetFilter'
import { MoreVertIcon } from '@icons'
import { TableFilters } from './components/TableFilters'
import { DropdownFilter } from './components/DropDownFilter'
import { TableDatePicker } from './components/DatePicker'
import { Data, TablePageInfo, TableProps } from './Table.config'

const getTableProps = <T extends string, K extends T = T>(
  x: TableProps<T, K>
) => x

const Table = <T extends string, K extends T>(props: TableProps<T, K>) => {
  const { columns, rows, actions, pageInfo, loading, onPagination } = props
  const [firstAction, secondAction, ...restActions] = actions || []
  const paginationInfo = pageInfo || ({} as TablePageInfo)
  const hasActions = actions !== undefined

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border: '1px solid #D8D8D8',
        boxShadow: 'none',
        fontSize: 'normal',
      }}
    >
      <Box mt={1}>
        <LazyLoading size="sm" show={Boolean(loading)} />
      </Box>
      <MuiTable size="small" sx={{ minWidth: 1280 }}>
        <TableHead
          sx={{ display: 'table-header-group', background: '#FCFDFD' }}
        >
          <TableRow>
            {columns.map(({ ...column }) => {
              return (
                <TableCell
                  key={column.accessor}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ fontSize: 'inherit' }}
                >
                  {column.Header}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            const firstActionObject =
              typeof firstAction === 'function'
                ? firstAction(row, index)
                : firstAction
            const secondActionObject =
              typeof secondAction === 'function'
                ? secondAction(row, index)
                : secondAction

            return (
              <TableRow hover key={index}>
                {columns.map(({ Cell, ...column }) => {
                  const value = column.format
                    ? column.format(row[column.accessor as keyof Data<T>])
                    : (row[column.accessor as keyof Data<T>] as string)

                  if (Cell && typeof Cell === 'function') {
                    return (
                      <TableCell
                        sx={{ fontSize: 'inherit' }}
                        key={column.accessor}
                        align={column.align}
                      >
                        <Cell row={row} value={value} />
                      </TableCell>
                    )
                  }
                  return (
                    <TableCell
                      sx={{ fontSize: 'inherit' }}
                      className="hide-scrollbar"
                      key={column.accessor}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        overflowX: 'auto',
                      }}
                    >
                      {value}
                    </TableCell>
                  )
                })}
                {hasActions && (
                  <TableCell align="right">
                    <HStack justifyContent="flex-end">
                      {firstActionObject && (
                        <Button
                          variant="text"
                          disabled={firstActionObject.disabled}
                          color={firstActionObject.color || 'primary'}
                          onClick={() => firstActionObject.execute(row, index)}
                        >
                          {firstActionObject.label}
                        </Button>
                      )}

                      {secondActionObject && (
                        <Button
                          variant="text"
                          color={secondActionObject.color || 'primary'}
                          disabled={secondActionObject.disabled}
                          onClick={() => secondActionObject.execute(row, index)}
                        >
                          {secondActionObject.label}
                        </Button>
                      )}
                      {restActions.length > 0 && (
                        <DropdownMenu
                          target={
                            <IconButton>
                              <MoreVertIcon />
                            </IconButton>
                          }
                        >
                          {restActions.map((action, idx) => {
                            const { disabled, execute, label } =
                              typeof action === 'function'
                                ? action(row, index)
                                : action
                            return (
                              <DropdownMenu.Item
                                key={idx}
                                disabled={disabled}
                                onClick={() => execute(row, index)}
                              >
                                {label}
                              </DropdownMenu.Item>
                            )
                          })}
                        </DropdownMenu>
                      )}
                    </HStack>
                  </TableCell>
                )}
              </TableRow>
            )
          })}
        </TableBody>
      </MuiTable>
      <TablePaginator
        current_page={paginationInfo.current_page}
        last_page={paginationInfo.last_page}
        per_page={paginationInfo.per_page}
        total={paginationInfo.total}
        onChange={onPagination}
      />
    </TableContainer>
  )
}

export default Table
Table.Search = Search
Table.Filters = TableFilters
Table.DropdownFilter = DropdownFilter
Table.ResetFilter = ResetFilter
Table.DatePicker = TableDatePicker

export { getTableProps }
