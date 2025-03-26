import * as yup from 'yup'

export const interiorSchema = yup.object({
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
