import Button from '@mui/material/Button'
import Loading from '@widgets/Loading'
import MuiTable from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import DropdownMenu from '../DropdownMenu'
import TablePaginator from '@widgets/TablePaginator'
import TableContainer from '@mui/material/TableContainer'

import { HStack } from '../Stack'
import { Search } from './components/Search'
import { Box, Paper } from '@mui/material'
import { ResetFilter } from './components/ResetFilter'
import { MoreVertIcon } from '@icons'
import { TableFilters } from './components/TableFilters'
import { DropdownFilter } from './components/DropDownFilter'
import { TableDatePicker } from './components/DatePicker'
import { DropdownMultiFilter } from './components/DropDownMultiFilter'
import { Data, TablePageInfo, TableProps } from './Table.config'

const getTableProps = <T extends string, K extends T = T>(
  x: TableProps<T, K>,
) => x

const Table = <T extends string, K extends T>(props: TableProps<T, K>) => {
  const { columns, rows, actions, pageInfo, loading, onPagination } = props
  const paginationInfo = pageInfo || ({} as TablePageInfo)

  const hasActions = actions !== undefined
  const [firstAction, secondAction, ...restActions] = actions || []
  return (
    <Box>
      <Box>
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            border: '1px solid #D8D8D8',
            boxShadow: 'none',
            fontSize: 'normal',
            position: 'relative',
            minHeight: '60dvh',
          }}
        >
          {!loading ? (
            <MuiTable size="small" sx={{ minWidth: 1200 }}>
              <TableHead
                sx={{
                  display: 'table-header-group',
                  height: 60,
                  background: '#FCFDFD',
                }}
              >
                <TableRow>
                  {columns.map(({ Cell, ...column }) => {
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
                                onClick={() =>
                                  firstActionObject.execute(row, index)
                                }
                              >
                                {firstActionObject.label}
                              </Button>
                            )}

                            {secondActionObject && (
                              <Button
                                variant="text"
                                color={secondActionObject.color || 'primary'}
                                disabled={secondActionObject.disabled}
                                onClick={() =>
                                  secondActionObject.execute(row, index)
                                }
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
          ) : (
            <Box
              mt={1}
              top="50%"
              left="50%"
              position="absolute"
              sx={{ transform: 'translate(-50%, -50%)' }}
            >
              <Loading size="md" />
            </Box>
          )}
        </TableContainer>
      </Box>
      <TablePaginator
        current_page={paginationInfo.current_page}
        last_page={paginationInfo.last_page}
        per_page={paginationInfo.per_page}
        total={paginationInfo.total}
        onChange={onPagination}
      />
    </Box>
  )
}

export default Table
Table.Search = Search
Table.Filters = TableFilters
Table.ResetFilter = ResetFilter
Table.DatePicker = TableDatePicker
Table.DropdownFilter = DropdownFilter
Table.DropDownMultiFilter = DropdownMultiFilter

export { getTableProps }
