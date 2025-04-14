import * as yup from 'yup'

const spotQuestionsSchema = yup.object({
  id: yup.string().required('Id is required'),
  text: yup.string().required('Text is required'),
  text_en: yup.string().required('Text in English is required'),
  step: yup.number().nullable(),
  question_value: yup.string().required('Question value is required'),
  progress_val: yup
    .number()
    .nullable()
    .typeError('Progress value is required')
    .default(null),
  is_multi_choice: yup.boolean(),
  is_multi_select: yup.boolean(),
  previous_question_id: yup.string().nullable().notRequired(),
  answers: yup
    .array()
    .of(
      yup.object({
        id: yup.string().required('Answer ID is required'),
        text: yup.string().required('Answer text is required'),
        text_en: yup.string().required('Answer text in English is required'),
        value: yup.string().required('Answer value is required'),
        disabled: yup.boolean().required('Disabled status is required'),
        icon: yup.string().nullable().default(null),
        next_question_id: yup.string().nullable().notRequired(),
      }),
    )
    .min(1, 'At least one answer is required')
    .required('Answers are required'),
})

const spotsSchema = yup.object({
  name: yup.string().required('Spot Name is required'),
  name_ge: yup.string(),
  description: yup
    .string()
    .required('Spot Description is required')
    .min(150, 'At least minimum 150 characters are required')
    .max(1000, 'At least maximum 1000 characters are requred'),
  description_ge: yup
    .string()
    .required('Spot Georgian Description is required')
    .min(150, 'At least minimum 150 characters are required')
    .max(1000, 'At least maximum 1000 characters are requred'),
  email: yup
    .string()
    .email('Spot Email is invalid')
    .required('Spot Email is required'),
  website: yup
    .string()
    .matches(
      /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,4}(:\d+)?(\/.*)?$/,
      'Enter a valid website URL',
    )
    .required('Spot Website is required'),
  phone: yup.string().required('Spot Phone number is required'),
  address: yup.string().required('Spot Address is required'),
  image: yup
    .array()
    .of(
      yup.object({
        file: yup.mixed<File>().required('Image file is required'),
        isMain: yup.boolean().required('isMain is required'),
        img_url: yup.string().optional(),
      }),
    )
    .transform(value => (value === null ? [] : value))
    .default(() => []),
  city: yup.string().required('City is required'),
  district: yup
    .array()
    .of(yup.string().required())
    .min(1, 'District is required')
    .required('District is required'),
  category: yup
    .mixed<string | string[]>()
    .test('is-valid-category', 'category is required', value => {
      if (typeof value === 'string') {
        return !!value.trim()
      }
      if (Array.isArray(value)) {
        return (
          value.length > 0 &&
          value.every(item => typeof item === 'string' && item.trim())
        )
      }
      return false
    })
    .required('category is required'),
  subcategory: yup
    .mixed<string | string[]>()
    .test('is-valid-subcategory', 'Subcategory is required', value => {
      if (typeof value === 'string') {
        return !!value.trim()
      }
      if (Array.isArray(value)) {
        return (
          value.length > 0 &&
          value.every(item => typeof item === 'string' && item.trim())
        )
      }
      return false
    })
    .required('Subcategory is required'),
  event_type: yup.array().of(yup.string().required()),
  people_range: yup
    .array()
    .of(yup.string().required())
    .min(1, 'People Range is required')
    .required('People Range is required'),
  price_range: yup
    .array()
    .of(yup.string().required())
    .min(1, 'Price Range is required')
    .required('Price Range is required'),
})

export { spotQuestionsSchema, spotsSchema }
