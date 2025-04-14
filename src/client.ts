import { Api } from '@api'
import { BASE_URL } from '@config'
import { getAccessToken } from '@utils'

const httpClient = new Api({
  baseURL: BASE_URL,
  headers: {
    Locale: 'en',
  },
})

export const apiClient = httpClient.instance
export const api = httpClient

apiClient.interceptors.request.use(
  config => {
    getAccessToken().ifJust(({ accessToken }) => {
      config.headers.Authorization = accessToken
    })
    return config
  },
  error => {
    return Promise.reject(error)
  },
)
