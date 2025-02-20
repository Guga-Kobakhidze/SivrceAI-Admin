import { getPageInfo } from '@helpers'
import { axiosInstance } from '@config'
import { REQ_KEYS, QUERY_KEYS } from '@queryKeys'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { IQuestions, WithKeyword, WithPagination } from '@rootTypes'

export type QuestionsFilters = WithKeyword & WithPagination

const spotQuestions = async (
  filters?: QuestionsFilters,
): Promise<IQuestions> => {
  const response = await axiosInstance.get(REQ_KEYS.getSpotQuestions, {
    params: filters,
  })
  return response.data
}

export const useSpotQuestions = (payload?: QuestionsFilters) => {
  const queryClient = useQueryClient()
  const { data, isPending, error } = useQuery<IQuestions>({
    queryKey: [QUERY_KEYS.SPOT_QUESTIONS, payload],
    queryFn: () => spotQuestions(payload),
    retry: false,
  })

  const questions = data?.items || []
  const pageInfo = getPageInfo(data as IQuestions)

  if (pageInfo?.current_page != null && payload) {
    const nextPage = pageInfo.current_page + 1

    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.SPOT_QUESTIONS, { ...payload, page: nextPage }],
      queryFn: () =>
        spotQuestions(payload ? { ...payload, page: nextPage } : undefined),
    })
  }

  return { questions, pageInfo, isLoading: isPending, error }
}
