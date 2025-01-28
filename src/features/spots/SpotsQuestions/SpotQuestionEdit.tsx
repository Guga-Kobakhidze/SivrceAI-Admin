import Loading from '@widgets/Loading'
import SpotsQuestionsForm from './SpotsQuestionForm'
import useEditSpotQuestion from './useEditSpotQuestion'
import useDeleteSpotQuestion from './useDeleteSpotQuestion'
import { toast } from 'react-toastify'
import { ROUTES } from '@constants'
import { IQuestion } from '@rootTypes'
import { useConfirmDialog } from '@context/ConfirmDialog/ConfirmDialog'
import { useSpotQuestionById } from './useSpotQuestionById'
import { useNavigate, useParams } from 'react-router-dom'

const SpotsQuesetionEdit = () => {
  const navigate = useNavigate()

  const { questionId } = useParams()
  const { showConfirmDialog } = useConfirmDialog()

  const { deleteQuestion, isDeleting, deleteError } = useDeleteSpotQuestion()
  const { editQuestion, editError, isEditing } = useEditSpotQuestion()
  const { question, error, loading, refetch } = useSpotQuestionById(
    questionId as string,
  )

  const onEdit = (data: IQuestion) => {
    editQuestion(
      { data, id: questionId as string },
      {
        onSuccess: () => {
          navigate(ROUTES.spotsQuestionTable)
          refetch()
        },
        onError: () => toast.error(editError?.message),
      },
    )
  }

  const onDelete = () => {
    showConfirmDialog({
      buttonType: 'error',
      cancelLabel: 'Cancel',
      title: 'Delete Question',
      confirmLabel: 'Delete question',
      description: 'Are you sure you want to delete this question?',
      onSuccess: async () => {
        deleteQuestion(
          { id: questionId as string },
          { onError: () => toast.error(deleteError?.message) },
        )
        navigate(ROUTES.spotsQuestionTable)
      },
    })
  }

  if (loading) return <Loading />

  return (
    <SpotsQuestionsForm
      isEdit
      onSubmit={onEdit}
      prefill={question}
      onDelete={onDelete}
      error={error?.message}
      isLoading={isDeleting || isEditing}
    />
  )
}

export default SpotsQuesetionEdit
