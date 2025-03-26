import Loading from '@widgets/Loading'
import SportsForm from './SportsForm'
import useEditSpot from './useEditSpot'
import useDeleteSpot from './useDeleteSpot'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useSpotById } from './useSpotById'
import { defaultValues, SubmitForm } from './Spots.config'

const SpotsEdit = () => {
  const { spotId } = useParams()
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
    deleteSpot({ id }, { onError: () => toast.error(deleteError?.message) })
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
