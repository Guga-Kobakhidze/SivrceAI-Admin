import Table, { getTableProps } from '@widgets/Table'
import { ROUTES } from '@constants'
import { IQuestion } from '@rootTypes'
import { getSearchParams } from '@utils'
import { useInteriorQuestions } from './useInteriorQuestions'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Loading from '@widgets/Loading'
import NoDataFound from '@widgets/NoDataFound'

const InteriorQuestionsTable = () => {
  const [, setParams] = useSearchParams()
  const searchParams = getSearchParams<any>()
  const navigate = useNavigate()

  const { data: questions, isPending, error } = useInteriorQuestions()

  if (isPending) return <Loading />
  if (error) return <NoDataFound />

  return (
    <Box>
      <Table.Filters>
        <Table.Search name="keyword" defaultValue={searchParams.keyword} />
      </Table.Filters>
      <Table
        {...getTableProps({
          pageInfo: {
            current_page: 1,
            last_page: 1,
            per_page: 10,
            total: questions.length,
          },
          loading: false,
          onPagination: ({ paginate, page }) => {
            setParams(params => {
              params.set('page', String(page))
              params.set('paginate', String(paginate))
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
          rows: questions.map(
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
    </Box>
  )
}

export default InteriorQuestionsTable
