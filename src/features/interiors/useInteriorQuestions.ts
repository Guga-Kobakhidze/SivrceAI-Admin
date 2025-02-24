import { getPageInfo } from '@helpers'
import { apiClient } from '@axiosInstance'
import { REQ_KEYS, QUERY_KEYS } from '@queryKeys'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { IQuestions, WithKeyword, WithPagination } from '@rootTypes'

export type QuestionsFilters = WithKeyword & WithPagination

const interiorQuestions = async (
  filters?: QuestionsFilters,
): Promise<IQuestions> => {
  const response = await apiClient.get(REQ_KEYS.getInteriorQuestions, {
    params: filters,
  })
  return response.data
}

export const useInteriorQuestions = (payload?: QuestionsFilters) => {
  const queryClient = useQueryClient()
  const { data, isPending, error } = useQuery<IQuestions>({
    queryKey: [QUERY_KEYS.INTERIOR_QUESTIONS, payload],
    queryFn: () => interiorQuestions(payload),
  })

  const pageInfo = getPageInfo(data as IQuestions)
  const questions = data?.items || []

  if (pageInfo?.current_page != null && payload) {
    const nextPage = pageInfo.current_page + 1

    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.INTERIOR_QUESTIONS, { ...payload, page: nextPage }],
      queryFn: () =>
        interiorQuestions(payload ? { ...payload, page: nextPage } : undefined),
    })
  }

  return { questions, pageInfo, isLoading: isPending, error }
}
