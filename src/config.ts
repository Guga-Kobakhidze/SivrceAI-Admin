// if (!API_URI) throw new Error('Can not find API_URI in env')
import axios from 'axios'

const EMAIL_ADDRESS = 'sivrceai@gmail.com'
const PASSWORD = 'Sivrce123'
const AUTH_CONFIG = 'AuthConfig'
const ACCESS_TOKEN = 'ACCESS_TOKEN'
const REFRESH_TOKEN = 'REFRESH_TOKEN'

export const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'accept-language': 'en',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdXBlcnVzZXIiLCJleHAiOjE3NDAwMDYwMDJ9.hrx0fgulyIIdTiSthqRiL_BCUj78ztslc7D2n7JBGQU'
  },
})

export const axiosLoginInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

const DEBOUNCE_TIME = 250
const PAGE_SIZE = 10
const ACCESS_TOKEN_KEY = 'AccessToken'
const LOCALE_KEY = 'locale'
const HEADER_HEIGHT = '64px'
const PAGE_SIZES = [10, 25, 50, 100]

export {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  DEBOUNCE_TIME,
  PAGE_SIZE,
  ACCESS_TOKEN_KEY,
  LOCALE_KEY,
  HEADER_HEIGHT,
  PAGE_SIZES,
  EMAIL_ADDRESS,
  PASSWORD,
  AUTH_CONFIG,
}
