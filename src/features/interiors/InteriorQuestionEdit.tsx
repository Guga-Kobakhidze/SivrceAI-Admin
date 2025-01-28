import { toast } from 'react-toastify'
import { ROUTES } from '@constants'
import { IQuestion } from '@rootTypes'
import { useConfirmDialog } from '@context/ConfirmDialog/ConfirmDialog'
import { useNavigate, useParams } from 'react-router-dom'
import { useInterioriQuestionById } from './useInteriorQuestionById'
import Loading from '@widgets/Loading'
import useEditInteriorQuestion from './useEditInteriorQuestion'
import useDeleteInteriorQuestion from './useDeleteInteriorQuestion'
import InteriorQuestionForm from './InteriorQuestionForm'

const InteriorQuestionEdit = () => {
  const navigate = useNavigate()

  const { questionId } = useParams()
  const { showConfirmDialog } = useConfirmDialog()

  const { editQuestion, editError, isEditing } = useEditInteriorQuestion()
  const { deleteQuestion, isDeleting, deleteError } =
    useDeleteInteriorQuestion()
  const { question, error, loading, refetch } = useInterioriQuestionById(
    questionId as string,
  )

  const onEdit = (data: IQuestion) => {
    editQuestion(
      { data, id: questionId as string },
      {
        onSuccess: () => {
          navigate(ROUTES.interiorQuestionTable)
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
        navigate(ROUTES.interiorQuestionTable)
      },
    })
  }

  if (loading) return <Loading />

  return (
    <InteriorQuestionForm
      isEdit
      onSubmit={onEdit}
      prefill={question}
      onDelete={onDelete}
      error={error?.message}
      isLoading={isDeleting || isEditing}
    />
  )
}

export default InteriorQuestionEdit
