import * as Yup from 'yup'

const spotQuestionsSchema = Yup.object({
  id: Yup.string().required('Id is required'),
  text: Yup.string().required('Text is required'),
  text_en: Yup.string().required('Text in English is required'),
  step: Yup.number().nullable(),
  question_value: Yup.string().required('Question value is required'),
  progress_val: Yup.number()
    .nullable()
    .typeError('Progress value is required')
    .default(null),
  is_multi_choice: Yup.boolean(),
  is_multi_select: Yup.boolean(),
  previous_question_id: Yup.string().nullable().notRequired(),
  answers: Yup.array()
    .of(
      Yup.object({
        id: Yup.string().required('Answer ID is required'),
        text: Yup.string().required('Answer text is required'),
        text_en: Yup.string().required('Answer text in English is required'),
        value: Yup.string().required('Answer value is required'),
        disabled: Yup.boolean().required('Disabled status is required'),
        icon: Yup.string().nullable().default(null),
        next_question_id: Yup.string().nullable().notRequired(),
      }),
    )
    .min(1, 'At least one answer is required')
    .required('Answers are required'),
})

const spotsSchema = Yup.object({
  name: Yup.string().required('Spot Name is required'),
  name_ge: Yup.string(),
  description: Yup.string()
    .required('Spot Description is required')
    .min(150, 'At least minimum 150 characters are required')
    .max(1000, 'At least maximum 1000 characters are requred'),
  description_ge: Yup.string()
    .required('Spot Georgian Description is required')
    .min(150, 'At least minimum 150 characters are required')
    .max(1000, 'At least maximum 1000 characters are requred'),
  email: Yup.string()
    .email('Spot Email is invalid')
    .required('Spot Email is required'),
  website: Yup.string()
    .matches(
      /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,4}(:\d+)?(\/.*)?$/,
      'Enter a valid website URL',
    )
    .required('Spot Website is required'),
  phone: Yup.string().required('Spot Phone number is required'),
  address: Yup.string().required('Spot Address is required'),
  images: Yup.array()
    .of(
      Yup.object().shape({
        file: Yup.mixed<File>().required('File is required'),
        isMain: Yup.boolean().required('isMain is required'),
      }),
    )
    .min(1, 'At least one image is required')
    .default([]),
  city: Yup.string().required('City is required'),
  district: Yup.array()
    .of(Yup.string().required())
    .min(1, 'District is required')
    .required('District is required'),
  category: Yup.string().required('Category is required'),
  subcategory: Yup.array()
    .of(Yup.string().required())
    .min(1, 'Suncategory is required')
    .required('Subcategory is required'),
  event_type: Yup.array().of(Yup.string().required()),
  people_range: Yup.array()
    .of(Yup.string().required())
    .min(1, 'People Range is required')
    .required('People Range is required'),
  price_range: Yup.array()
    .of(Yup.string().required())
    .min(1, 'Price Range is required')
    .required('Price Range is required'),
})

export { spotQuestionsSchema, spotsSchema }
