import axios from 'axios'
import { BASE_URL } from '@config'
import { getAccessToken, qs } from '@utils'

const axiosClient = axios.create({
  baseURL: BASE_URL,
  paramsSerializer: (params: unknown) => {
    return qs.stringify(params, { encode: false })
  },
})

axiosClient.interceptors.request.use(
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

const axiosImageInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

const apiClient = axiosClient
const apiImageClient = axiosImageInstance

export { apiClient, apiImageClient }
