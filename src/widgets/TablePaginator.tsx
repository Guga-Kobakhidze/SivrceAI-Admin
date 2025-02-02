import * as React from 'react'
import TablePagination from '@mui/material/TablePagination'
import { TablePaginatorProps } from '@rootTypes'
import { PAGE_SIZES } from '@config'

const TablePaginator: React.FC<TablePaginatorProps> = ({
  per_page,
  onChange,
  total = 0,
  current_page = 0,
}) => {
  return (
    <TablePagination
      rowsPerPageOptions={PAGE_SIZES}
      component="div"
      count={total}
      rowsPerPage={per_page ?? 10}
      page={current_page - 1}
      onPageChange={(_, newPage) =>
        onChange({ page: newPage + 1, size: per_page! })
      }
      onRowsPerPageChange={e => {
        onChange({
          page: 1,
          size: Number(e.target.value),
        })
      }}
    />
  )
}

export default TablePaginator
