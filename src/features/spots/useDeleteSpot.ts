import { toast } from 'react-toastify'
import { apiClient } from '@axiosInstance'
import { DeleteRequest } from './Spots.config'
import { REQ_KEYS, QUERY_KEYS } from '@queryKeys'
import { ErrorResponse, IApiError } from '@rootTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const deleteSpot = async ({ id }: DeleteRequest): Promise<ErrorResponse> => {
  try {
    const response = await apiClient.delete(`${REQ_KEYS.deleteSpot}/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error?.message || 'Failed to delete spot')
  }
}

export default function useDeleteSpot() {
  const queryQlient = useQueryClient()

  const { mutate, isPending, error } = useMutation<
    ErrorResponse,
    IApiError,
    DeleteRequest
  >({
    mutationFn: deleteSpot,
    onSuccess: () => {
      toast.success('Spot Deleted Successfully')
      queryQlient.invalidateQueries({
        queryKey: [QUERY_KEYS.SPOTS],
      })
    },
  })

  return { deleteSpot: mutate, isDeleting: isPending, deleteError: error }
}
