import { QKeys } from '@queryKeys'
import { useQuery } from '@tanstack/react-query'
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
  const { data, isPending, error } = useQuery<IQuestions>({
    queryKey: [INTERIOR_QUESTIONS, payload || {}],
    queryFn: () => interiorQuestions(payload),
    staleTime: 60 * 5000,
  })

  const pageInfo = getPageInfo(data as IQuestions)
  const questions = data?.items || []

  return { questions, pageInfo, isLoading: isPending, error }
}
