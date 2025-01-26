import { QKeys } from '@queryKeys'
import { IQuestions } from './SpotsQuestions.config'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { axiosInstance, SPOT_QUESTIONS } from '@config'

const spotQuestions = async (): Promise<IQuestions> => {
  const response = await axiosInstance.get(QKeys.getSpotQuestions)
  return response.data
}

export const useSpotQuestions = (): UseQueryResult<IQuestions> => {
  return useQuery<IQuestions>({
    queryKey: [SPOT_QUESTIONS],
    queryFn: spotQuestions,
    staleTime: 60 * 5000,
  })
}
