import * as Yup from 'yup'

export const spotsSchema = Yup.object({
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
