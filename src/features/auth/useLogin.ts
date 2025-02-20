import { ILogin } from './Auth.config'
import { useMutation } from '@tanstack/react-query'
import { axiosLoginInstance } from '@config'
import { REQ_KEYS } from '@queryKeys'

export const useLogin = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: loginRequest,
  })
  return { login: mutate, loading: isPending, error }
}

const loginRequest = async (payload: ILogin) => {
  const { data } = await axiosLoginInstance.post(REQ_KEYS.getAuth, payload)
  return data as unknown as {
    accessToken: string
    refreshToken: string
  }
}
