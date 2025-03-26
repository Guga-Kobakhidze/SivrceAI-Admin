import SportForm from './SportsForm'
import useCreateSpot from './useCreateSpot'
import { toast } from 'react-toastify'
import { defaultValues, SubmitForm } from './Spots.config'

const SpotCreate = () => {
  const { createSpot, createError, isCreating } = useCreateSpot()

  const onSubmit = (data: SubmitForm) => {
    createSpot(data, {
      onError: () => toast.error(createError?.message),
    })
  }

  return (
    <SportForm
      onSubmit={onSubmit}
      loading={isCreating}
      defaultValues={defaultValues}
    />
  )
}

export default SpotCreate
