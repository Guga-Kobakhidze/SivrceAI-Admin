import { ISpots } from './Spots.config'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@axiosInstance'
import { getPageInfo } from '@helpers'
import { REQ_KEYS, QUERY_KEYS } from '@queryKeys'
import { IPageInfo, WithKeyword, WithPagination } from '@rootTypes'

export type QuestionsFilters = WithKeyword & WithPagination

const getSpots = async (filters?: QuestionsFilters): Promise<ISpots> => {
  const response = await apiClient.get(`${REQ_KEYS.getAllSpots}`, {
    params: filters,
  })
  return response.data
}

export const useSpots = (payload?: QuestionsFilters) => {
  const { data, isPending, error } = useQuery<ISpots>({
    queryKey: [QUERY_KEYS.SPOTS, payload],
    queryFn: () => getSpots(payload),
    retry: false,
  })

  const spots: ISpots['items'] = data?.items || []
  const pageInfo = getPageInfo(data as IPageInfo)
  return { spots, pageInfo, isLoading: isPending, error }
}
