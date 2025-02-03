import { QKeys } from '@queryKeys'
import { useQuery } from '@tanstack/react-query'
import { getPageInfo } from '@helpers'
import { axiosInstance, SPOT_QUESTIONS } from '@config'
import { IQuestions, WithKeyword, WithPagination } from '@rootTypes'

export type QuestionsFilters = WithKeyword & WithPagination

const spotQuestions = async (
  filters?: QuestionsFilters,
): Promise<IQuestions> => {
  const response = await axiosInstance.get(QKeys.getSpotQuestions, {
    params: filters ?? {},
  })
  return response.data
}

export const useSpotQuestions = (payload?: QuestionsFilters) => {
  const { data, isPending, error } = useQuery<IQuestions>({
    queryKey: [SPOT_QUESTIONS, payload || {}],
    queryFn: () => spotQuestions(payload),
    staleTime: 60 * 5000,
  })

  const questions = data?.items || []
  const pageInfo = getPageInfo(data as IQuestions)

  return { questions, pageInfo, isLoading: isPending, error }
}
