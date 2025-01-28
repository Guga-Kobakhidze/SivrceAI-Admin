export const defaultValues: IQuestion = {
  id: '',
  text: '',
  step: null,
  text_en: '',
  question_value: '',
  progress_val: null,
  is_multi_choice: false,
  is_multi_select: false,
  previous_question_id: '',
  answers: [
    {
      id: '',
      text: '',
      value: '',
      icon: null,
      text_en: '',
      disabled: false,
      next_question_id: '',
    },
  ],
}

export type IAnswers = {
  id: string
  text: string
  text_en: string
  value: string
  disabled: boolean
  icon: string | null
  next_question_id?: string | null
}

export type IQuestion = {
  id: string
  text: string
  step?: number | null
  text_en: string
  question_value: string
  progress_val: number | null
  is_multi_select?: boolean
  is_multi_choice?: boolean
  previous_question_id?: string | null
  answers: IAnswers[]
}

export type IQuestions = IQuestion[]

// Create Question

export interface CreateRequest {
  data: IQuestion
}

// Delete Question

export interface DeleteRequest {
  id: string
}

export interface ErrorResponse {
  error: { message: string }
}
