import { toast } from 'react-toastify'
import { ROUTES } from '@constants'
import { useNavigate } from 'react-router-dom'
import useCreateInteriorQuestion from './useCreateInteriorQuestion'
import InteriorQuestionForm from './InteriorQuestionForm'

const InteriorQuestionCreate = () => {
  const navigate = useNavigate()
  const { createQuestion, createError, isCreating } =
    useCreateInteriorQuestion()

  const onCreate = (data: any) => {
    createQuestion(
      { data },
      {
        onSuccess: () => navigate(ROUTES.interiorQuestionTable),
        onError: () => toast.error(createError?.message),
      },
    )
  }

  return <InteriorQuestionForm isLoading={isCreating} onSubmit={onCreate} />
}

export default InteriorQuestionCreate
