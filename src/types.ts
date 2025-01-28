export type Action = {
  label: string
  execute: () => void
  type: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
}

export type PageInfo = {
  last_page: number
  per_page: number
  total: number
  current_page: number
}

export type OnChangeParams = { page: number; paginate: number }

export type TablePaginatorProps = Partial<PageInfo> & {
  onChange: ({ page, paginate }: OnChangeParams) => void
}

export interface IApiError {
  error: string
  status: number
  message: string
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
