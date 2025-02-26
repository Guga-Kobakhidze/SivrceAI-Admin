import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@axiosInstance'
import { REQ_KEYS, QUERY_KEYS } from '@queryKeys'
import { IUser, WithKeyword, WithPagination } from '@rootTypes'

export type QuestionsFilters = WithKeyword & WithPagination

const getUsers = async (filters?: QuestionsFilters): Promise<IUser[]> => {
  const response = await apiClient.get(REQ_KEYS.getAllUser, {
    params: filters,
  })
  return response.data
}

export const useUsers = (payload?: QuestionsFilters) => {
  //   const queryClient = useQueryClient()
  const { data, isPending, error } = useQuery<IUser[]>({
    queryKey: [QUERY_KEYS.USERS, payload],
    queryFn: () => getUsers(payload),
    retry: false,
  })

  const users = data || []

  //   queryClient.prefetchQuery({
  //     queryKey: [QUERY_KEYS.USERS, payload],
  //     queryFn: () => spotQuestions(payload ? { ...payload } : undefined),
  //   })

  return { users, isLoading: isPending, error }
}
