import { toast } from 'react-toastify'
import SpotsQuestionsForm from './SpotsQuestionForm'
import useCreateSpotQuestion from './useCreateSpotQuestion'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@constants'

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
