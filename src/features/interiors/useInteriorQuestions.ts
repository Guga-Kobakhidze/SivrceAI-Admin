import { QKeys } from '@queryKeys'
import { IQuestions } from '@rootTypes'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { axiosInstance, INTERIOR_QUESTIONS } from '@config'

const interiorQuestions = async (): Promise<IQuestions> => {
  const response = await axiosInstance.get(QKeys.getInteriorQuestions)
  return response.data
}

export const useInteriorQuestions = (): UseQueryResult<IQuestions> => {
  return useQuery<IQuestions>({
    queryKey: [INTERIOR_QUESTIONS],
    queryFn: interiorQuestions,
    staleTime: 60 * 5000,
  })
}
