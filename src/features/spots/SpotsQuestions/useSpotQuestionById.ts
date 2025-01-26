import { QKeys } from '@queryKeys'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance, SPOT_QUESTION_ID } from '@config'
import { IQuestion } from './SpotsQuestions.config'

const spotQuestionById = async (id: string) => {
  const response = await axiosInstance.get(`${QKeys.getSpotQuestionById}${id}/`)
  return response.data
}

export const useSpotQuestionById = (id: string) => {
  const { data, error, isPending, refetch } = useQuery<IQuestion[]>({
    queryKey: [SPOT_QUESTION_ID, { id }],
    queryFn: () => spotQuestionById(id),
    enabled: !!id,
  })

  const question = data?.[0]
  return { question, error, loading: isPending, refetch }
}
