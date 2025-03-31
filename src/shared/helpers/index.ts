import { IPageInfo } from '@rootTypes'

export const pxToRem = (number: number, baseNumber = 16) =>
  `${number / baseNumber}rem`

export const getPageInfo = (data: IPageInfo) => {
  const pageInfo = {
    current_page: data?.page ?? 0,
    last_page: data?.pages ?? 0,
    per_page: data?.size ?? 0,
    total: data?.total ?? 0,
  }

  return pageInfo
}

export const appendToFormData = (
  prefix: string,
  obj: any,
  formData: FormData,
  iteration = 0,
) => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const fdKey = iteration === 0 ? key : `[${key}]`
      if (Array.isArray(obj[key])) {
        obj[key].forEach((item: any, index: number) => {
          appendToFormData(
            `${prefix}${fdKey}[${index}]`,
            item,
            formData,
            iteration + 1,
          )
        })
      } else if (
        typeof obj[key] === 'object' &&
        obj[key] !== null &&
        !(obj[key] instanceof File)
      ) {
        appendToFormData(`${prefix}${fdKey}`, obj[key], formData, iteration + 1)
      } else {
        formData.append(
          `${prefix}${fdKey}`,
          obj[key] !== undefined ? obj[key] : '',
        )
      }
    }
  }
}

export const getCapitalize = (value: string) => {
  return value
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const formatPhoneNumber = (value: string) => {
  return value.replace(/\D/g, '')
}
