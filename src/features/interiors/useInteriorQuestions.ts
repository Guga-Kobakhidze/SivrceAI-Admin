import { QKeys } from '@queryKeys'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { axiosInstance, INTERIOR_QUESTIONS } from '@config'
import { IQuestions, WithKeyword, WithPagination } from '@rootTypes'
import { getPageInfo } from '@helpers'

export type QuestionsFilters = WithKeyword & WithPagination

const interiorQuestions = async (
  filters?: QuestionsFilters,
): Promise<IQuestions> => {
  const response = await axiosInstance.get(QKeys.getInteriorQuestions, {
    params: filters ?? {},
  })
  return response.data
}

export const useInteriorQuestions = (payload?: QuestionsFilters) => {
  console.log(payload)
  const queryClient = useQueryClient()
  const { data, isPending, error } = useQuery<IQuestions>({
    queryKey: [INTERIOR_QUESTIONS, payload || {}],
    queryFn: () => interiorQuestions(payload),
  })

  const pageInfo = getPageInfo(data as IQuestions)
  const questions = data?.items || []

  if (pageInfo?.current_page != null) {
    const nextPage = pageInfo.current_page + 1

    queryClient.prefetchQuery({
      queryKey: [INTERIOR_QUESTIONS, { ...payload, page: nextPage }],
      queryFn: () =>
        interiorQuestions(payload ? { ...payload, page: nextPage } : undefined),
    })
  }

  return { questions, pageInfo, isLoading: isPending, error }
}
