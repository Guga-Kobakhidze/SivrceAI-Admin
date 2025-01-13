export const pxToRem = (number: number, baseNumber = 16) =>
  `${number / baseNumber}rem`

export const appendToFormData = (
  prefix: string,
  obj: any,
  formData: FormData,
  iteration = 0
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
            iteration + 1
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
          obj[key] !== undefined ? obj[key] : ''
        )
      }
    }
  }
}
