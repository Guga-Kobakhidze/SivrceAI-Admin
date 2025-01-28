import { toast } from 'react-toastify'
import { ROUTES } from '@constants'
import { useNavigate } from 'react-router-dom'
import SpotsQuestionsForm from './SpotsQuestionForm'
import useCreateSpotQuestion from './useCreateSpotQuestion'

const SpotsQuesetionCreate = () => {
  const navigate = useNavigate()
  const { createQuestion, createError, isCreating } = useCreateSpotQuestion()

  const onCreate = (data: any) => {
    createQuestion(
      { data },
      {
        onSuccess: () => navigate(ROUTES.spotsQuestionTable),
        onError: () => toast.error(createError?.message),
      },
    )
  }

  return <SpotsQuestionsForm isLoading={isCreating} onSubmit={onCreate} />
}

export default SpotsQuesetionCreate
