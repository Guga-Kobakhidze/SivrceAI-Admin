import { ILogin } from './Auth.config'
import { useMutation } from '@tanstack/react-query'
import { REQ_KEYS } from '@queryKeys'
import { apiClient } from '@axiosInstance'

export const useLogin = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: loginRequest,
  })
  return { login: mutate, loading: isPending, error }
}

const loginRequest = async (payload: ILogin) => {
  const { data } = await apiClient.post(REQ_KEYS.getAuth, payload)
  return data as unknown as {
    access_token: string
  }
}
