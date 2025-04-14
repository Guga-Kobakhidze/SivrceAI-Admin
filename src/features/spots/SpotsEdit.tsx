import Loading from '@widgets/Loading'
import SportsForm from './SportsForm'
import useEditSpot from './useEditSpot'
import useDeleteSpot from './useDeleteSpot'
import { toast } from 'react-toastify'
import { ROUTES } from '@constants'
import { useSpotById } from './useSpotById'
import { useConfirmDialog } from '@context/ConfirmDialog/ConfirmDialog'
import { useNavigate, useParams } from 'react-router-dom'
import { defaultValues, SubmitForm } from './Spots.config'

const SpotsEdit = () => {
  const navigate = useNavigate()
  const { spotId } = useParams()
  const { showConfirmDialog } = useConfirmDialog()

  const { prefill, isLoading } = useSpotById(spotId ?? '')
  const { editSpot, isEditing, editError } = useEditSpot()
  const { deleteSpot, isDeleting, deleteError } = useDeleteSpot()

  const onSubmit = (data: SubmitForm) => {
    editSpot(
      { data, id: spotId ?? '' },
      { onError: () => toast.error(editError?.message) },
    )
  }

  const onDelete = (id: string) => {
    showConfirmDialog({
      buttonType: 'error',
      cancelLabel: 'Cancel',
      title: 'Delete Spot',
      confirmLabel: 'Delete spot',
      description: 'Are you sure you want to delete this spot?',
      onSuccess: async () => {
        deleteSpot(
          { id },
          {
            onSuccess: () => navigate(ROUTES.spotsTable),
            onError: () => toast.error(deleteError?.message),
          },
        )
      },
    })
  }

  if (isLoading) return <Loading />

  return (
    <SportsForm
      isEdit
      onSubmit={onSubmit}
      onDelete={onDelete}
      loading={isEditing || isDeleting}
      defaultValues={prefill || defaultValues}
    />
  )
}

export default SpotsEdit
