import Table, { getTableProps } from '@widgets/Table'
import Loading from '@widgets/Loading'
import NoDataFound from '@widgets/NoDataFound'
import { ROUTES } from '@constants'
import { IQuestion } from '@rootTypes'
import { useInteriorQuestions } from './useInteriorQuestions'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { extractPageAndSize, getSearchParams } from '@utils'

const InteriorQuestionsTable = () => {
  const [, setParams] = useSearchParams()
  const searchParams = getSearchParams<any>()
  const paginate = extractPageAndSize(searchParams)
  const navigate = useNavigate()

  const { questions, isLoading, pageInfo, error } = useInteriorQuestions({
    ...searchParams,
    ...paginate,
  })

  if (error) return <NoDataFound />

  return (
    <Box mt={3}>
      {!isLoading ? (
        <Table
          {...getTableProps({
            pageInfo,
            loading: false,
            onPagination: ({ size, page }) => {
              setParams(params => {
                params.set('page', String(page))
                params.set('size', String(size))
                return params
              })
            },
            columns: [
              { Header: 'Question Title', accessor: 'text' },
              { Header: 'Question Id', accessor: 'id' },
              { Header: 'Question Value', accessor: 'question_value' },
              { Header: 'Progress Value', accessor: 'progress_val' },
              {
                Header: 'Multi Select',
                accessor: 'is_multi_select',
                Cell: ({ value }) => (
                  <Typography>{value ? 'Active' : 'Inactive'}</Typography>
                ),
              },
              {
                Header: 'Multi Choice',
                accessor: 'is_multi_choice',
                Cell: ({ value }) => (
                  <Typography>{value ? 'Active' : 'Inactive'}</Typography>
                ),
              },
              {
                Header: 'Action',
                accessor: 'action',
                Cell: ({ row }) => (
                  <Button
                    variant="contained"
                    onClick={() =>
                      navigate(
                        `${ROUTES.editInteriorQuestion}/${row.id as string}`,
                      )
                    }
                  >
                    Details
                  </Button>
                ),
              },
            ],
            rows: questions?.map(
              ({
                id,
                text,
                question_value,
                is_multi_select,
                is_multi_choice,
                previous_question_id,
                progress_val,
              }: IQuestion) => ({
                id,
                text,
                question_value,
                is_multi_select,
                is_multi_choice,
                previous_question_id,
                progress_val,
              }),
            ),
          })}
        />
      ) : (
        <Loading />
      )}
    </Box>
  )
}

export default InteriorQuestionsTable
