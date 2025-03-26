import { apiClient } from '@axiosInstance'
import { REQ_KEYS, QUERY_KEYS } from '@queryKeys'
import { useQuery } from '@tanstack/react-query'
import { ISpotResponse } from './Spots.config'

const getSpotById = async (id: string): Promise<ISpotResponse> => {
  const response = await apiClient.get(`${REQ_KEYS.getSpotById}/${id}`)
  return response.data
}

export const useSpotById = (id: string) => {
  const { data, isPending, error } = useQuery<ISpotResponse>({
    queryKey: [QUERY_KEYS.SPOT_ID, id],
    queryFn: () => getSpotById(id),
    retry: false,
  })

  return { prefill: data, isLoading: isPending, error }
}
