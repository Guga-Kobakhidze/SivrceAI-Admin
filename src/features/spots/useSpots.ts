import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@axiosInstance'
import { getPageInfo } from '@helpers'
import { ISpotResponse } from './Spots.config'
import { REQ_KEYS, QUERY_KEYS } from '@queryKeys'
import { WithKeyword, WithPagination } from '@rootTypes'

export type QuestionsFilters = WithKeyword & WithPagination

const getSpots = async (
  filters?: QuestionsFilters,
): Promise<ISpotResponse[]> => {
  const response = await apiClient.get(`${REQ_KEYS.getAllSpots}`, {
    params: filters,
  })
  return response.data
}

export const useSpots = (payload?: QuestionsFilters) => {
  const { data, isPending, error } = useQuery<ISpotResponse[]>({
    queryKey: [QUERY_KEYS.SPOTS, payload],
    queryFn: () => getSpots(payload),
    retry: false,
  })

  const spots: ISpotResponse[] = data || []
  const pageInfo = getPageInfo(data as any)
  return { spots, pageInfo, isLoading: isPending, error }
}
