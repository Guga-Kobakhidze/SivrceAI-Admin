import { toast } from 'react-toastify'
import { apiClient } from '@axiosInstance'
import { REQ_KEYS, QUERY_KEYS } from '@queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ErrorResponse, IApiError } from '@rootTypes'
import { SubmitForm } from './Spots.config'

type EditSpotType = { data: SubmitForm } & { id: string }

const editSpot = async ({ id, data }: EditSpotType): Promise<ErrorResponse> => {
  try {
    const response = await apiClient.patch(`${REQ_KEYS.addEditSpot}/${id}`, data)
    return response.data
  } catch (error: any) {
    console.error(error)
    throw new Error('Failed to Edit spot')
  }
}

export default function useEditSpot() {
  const queryQlient = useQueryClient()

  const { mutate, isPending, error } = useMutation<
    ErrorResponse,
    IApiError,
    EditSpotType
  >({
    mutationFn: editSpot,
    onSuccess: () => {
      toast.success('Spot Edited Successfully')
      queryQlient.invalidateQueries({
        queryKey: [QUERY_KEYS.SPOTS],
      })
    },
  })

  return { editSpot: mutate, isEditing: isPending, editError: error }
}
