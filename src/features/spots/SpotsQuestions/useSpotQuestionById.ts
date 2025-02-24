import { useQuery } from '@tanstack/react-query'
import { IQuestion } from '@rootTypes'
import { apiClient } from '@axiosInstance'
import { REQ_KEYS, QUERY_KEYS } from '@queryKeys'

const spotQuestionById = async (id: string) => {
  const response = await apiClient.get(`${REQ_KEYS.getSpotQuestionById}${id}/`)
  return response.data
}

export const useSpotQuestionById = (id: string) => {
  const { data, error, isPending, refetch } = useQuery<IQuestion[]>({
    queryKey: [QUERY_KEYS.SPOT_QUESTION_ID, { id }],
    queryFn: () => spotQuestionById(id),
    enabled: !!id,
  })

  const question = data?.[0]
  return { question, error, loading: isPending, refetch }
}
