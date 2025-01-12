import { Maybe, Nothing } from 'purify-ts'

export const setStorageItem =
  (storage: Storage) => (key: string, value: object) => {
    storage.setItem(
      key,
      JSON.stringify({
        value,
        createdAt: Date.now(),
      })
    )
  }

export const getStorageItem =
  (storage: Storage) =>
  <T>(key: string): Maybe<T> => {
    try {
      const { value } = JSON.parse(storage.getItem(key) || '')
      return Maybe.of(value)
    } catch {
      return Nothing
    }
  }

export const removeStorageItem = (storage: Storage) => (key: string) => {
  storage.removeItem(key)
}
export const clearStorage = (storage: Storage) => () => {
  storage.clear()
}

// Local Storage
export const setLocalStorageItem = setStorageItem(localStorage)
export const getLocalStorageItem = getStorageItem(localStorage)
export const removeLocalStorageItem = removeStorageItem(localStorage)
export const clearLocalStorage = clearStorage(localStorage)

// Session Storage
export const setSessionStorageItem = setStorageItem(sessionStorage)
export const getSessionStorageItem = getStorageItem(sessionStorage)
export const removeSessionStorageItem = removeStorageItem(sessionStorage)
export const clearSessionStorage = clearStorage(sessionStorage)
