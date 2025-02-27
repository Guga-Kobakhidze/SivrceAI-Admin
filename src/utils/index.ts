import { ACCESS_TOKEN, PAGE_SIZE, PAGE_SIZES, THEME_MODE } from '@config'
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from '@storage'
import { Maybe } from 'purify-ts'
import querystring from 'qs'

export const qs = {
  stringify: querystring.stringify,
  parse: (data: string | Record<string, string>) =>
    querystring.parse(data, {
      // @ts-expect-error: Ignoring unused variable warning
      decoder(value, decoder, charset) {
        const keywords = {
          true: true,
          false: false,
          null: null,
          undefined: undefined,
        }
        if (value in keywords) {
          return keywords[value as keyof typeof keywords]
        }

        const strWithoutPlus = value.replace(/\+/g, ' ')
        if (charset === 'iso-8859-1') {
          return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape)
        }
        // utf-8
        try {
          return decodeURIComponent(strWithoutPlus)
        } catch (e) {
          console.error(e)
          return strWithoutPlus
        }
      },
    }),
}

export const getSearchParams = <T>() => {
  return qs.parse(window.location.search.substr(1)) as T
}

// Pagination

export const isEmptyObject = (obj: object) => {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false
    }
  }
  return true
}

export const adjustPageSize = (pageSize: number) =>
  PAGE_SIZES.reduce(
    (prev, curr) => (curr <= pageSize ? curr : prev),
    PAGE_SIZES[0],
  )

export const extractPageAndSize = (
  query: any,
): { size: number; page: number } => {
  if (!query || typeof query !== 'object' || isEmptyObject(query))
    return { page: 1, size: PAGE_SIZE }

  const page = parseFloat(query.page)
  const size = parseFloat(query['size'])

  return {
    page: page && !isNaN(page) ? page : 1,
    size: size && !isNaN(size) ? adjustPageSize(size) : PAGE_SIZE,
  }
}

// Set Localstorage

export const setAuthToken = (accessToken: string) => {
  removeAuthToken()
  setLocalStorageItem(ACCESS_TOKEN, {
    accessToken: `Bearer ${accessToken}`,
  })
}

export const setThemeMode = (mode: string) => {
  setLocalStorageItem(THEME_MODE, { themeMode: mode })
}

// Get LocalStorage

export const getAccessToken = () =>
  getLocalStorageItem<{ accessToken: string }>(ACCESS_TOKEN)

export const getTokens = () =>
  getAccessToken().chain(({ accessToken }) => {
    return Maybe.of({ accessToken })
  })

export const getThemeMode = () =>
  getLocalStorageItem<{ themeMode: string }>(THEME_MODE)

// Remove Localstorage

export const removeAuthToken = () => {
  removeLocalStorageItem(ACCESS_TOKEN)
}
