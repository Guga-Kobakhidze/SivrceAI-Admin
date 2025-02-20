import { IUser } from './Auth.config'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@config'
import { getAccessToken } from '@utils'
import { REQ_KEYS, QUERY_KEYS } from '@queryKeys'

const emptyUser = new Object() as IUser

const getUser = async () => {
  const { data } = await axiosInstance.get(REQ_KEYS.getUser)
  return data as unknown as IUser
}

export const useUser = () => {
  const { data, isPending, refetch } = useQuery({
    staleTime: 0,
    queryFn: () => {
      try {
        getAccessToken().unsafeCoerce()
        return getUser()
      } catch {
        return Promise.resolve(emptyUser)
      }
    },
    queryKey: [QUERY_KEYS.USER],
  })

  return {
    user: data,
    loading: isPending,
    isAuthenticated: Boolean(
      data !== undefined && data !== emptyUser && data.id,
    ),
    refetch,
  }
}
