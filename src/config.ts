// if (!API_URI) throw new Error('Can not find API_URI in env')
import axios from 'axios'

const EMAIL_ADDRESS = 'sivrceai@gmail.com'
const PASSWORD = 'Sivrce123'
const AUTH_CONFIG = 'AuthConfig'

const SPOT = 'spot'
const SPOT_ID = 'spot_id'
const SPOT_QUESTIONS = 'spot_questions'
const SPOT_QUESTION_ID = 'spot_question_id'
const INTERIOR_QUESTIONS = 'interior_questions'
const INTERIOR_QUESTION_ID = 'interior_question_id'

export const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'accept-language': 'en',
  },
})

const DEBOUNCE_TIME = 250
const PAGE_SIZE = 10
const ACCESS_TOKEN_KEY = 'AccessToken'
const LOCALE_KEY = 'locale'
const HEADER_HEIGHT = '64px'
const PAGE_SIZES = [10, 25, 50, 100]

export {
  SPOT,
  SPOT_ID,
  DEBOUNCE_TIME,
  PAGE_SIZE,
  ACCESS_TOKEN_KEY,
  LOCALE_KEY,
  HEADER_HEIGHT,
  PAGE_SIZES,
  SPOT_QUESTIONS,
  SPOT_QUESTION_ID,
  INTERIOR_QUESTIONS,
  INTERIOR_QUESTION_ID,
  EMAIL_ADDRESS,
  PASSWORD,
  AUTH_CONFIG,
}
