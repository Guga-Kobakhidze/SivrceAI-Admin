import { IUser } from './Auth.config'
import { useQuery } from '@tanstack/react-query'
import { REQ_KEYS, QUERY_KEYS } from '@queryKeys'
import { apiClient } from '@axiosInstance'

const getUser = async (): Promise<IUser> => {
  const { data } = await apiClient.get(REQ_KEYS.getUser)
  return data as IUser
}

export const useUser = () => {
  const { data, isLoading } = useQuery<IUser>({
    queryKey: [QUERY_KEYS.USER],
    queryFn: getUser,
    retry: false,
    staleTime: 600000, // 10 minutes
  })

  const isAuthenticated = Boolean(data && data.id)

  return {
    data,
    isAuthenticated,
    loading: isLoading,
  }
}
