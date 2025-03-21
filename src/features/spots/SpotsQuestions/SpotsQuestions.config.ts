import { IQuestion } from '@rootTypes'

export const defaultValues: IQuestion = {
  id: '',
  text: '',
  step: 0,
  text_en: '',
  question_value: '',
  progress_val: 0,
  is_multi_choice: false,
  is_multi_select: false,
  previous_question_id: '',
  answers: [
    {
      id: '',
      text: '',
      value: '',
      icon: '',
      text_en: '',
      disabled: false,
      next_question_id: '',
    },
  ],
}

export interface SpotsQuestionsFormProps {
  prefill?: IQuestion
  onDelete?: () => void
  onSubmit: (data: IQuestion) => void
  isLoading?: boolean
  error?: string | null
  isEdit?: boolean
}
