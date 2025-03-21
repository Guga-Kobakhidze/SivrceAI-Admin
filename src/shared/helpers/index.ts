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

export const getValuesToUpperCase = (data?: string | string[]) =>
  Array.isArray(data)
    ? data.map(str => str.replace(/\s+/g, '_').toUpperCase())
    : data?.replace(/\s+/g, '_').toUpperCase()
