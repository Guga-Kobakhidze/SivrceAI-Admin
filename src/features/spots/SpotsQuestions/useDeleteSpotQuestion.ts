import { toast } from 'react-toastify'
import { axiosInstance } from '@config'
import { REQ_KEYS, QUERY_KEYS } from '@queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DeleteRequest, ErrorResponse, IApiError } from '@rootTypes'

const deleteSpotQuestion = async ({
  id,
}: DeleteRequest): Promise<ErrorResponse> => {
  try {
    const response = await axiosInstance.delete(
      `${REQ_KEYS.deleteSpotQuestion}${id}`,
    )
    return response.data
  } catch (error: any) {
    throw new Error(error?.message || 'Failed to delete question')
  }
}

export default function useDeleteSpotQuestion() {
  const queryQlient = useQueryClient()

  const { mutate, isPending, error } = useMutation<
    ErrorResponse,
    IApiError,
    DeleteRequest
  >({
    mutationFn: deleteSpotQuestion,
    onSuccess: () => {
      toast.success('Question Deleted Successfully')
      queryQlient.invalidateQueries({
        queryKey: [QUERY_KEYS.SPOT_QUESTIONS],
      })
    },
  })

  return { deleteQuestion: mutate, isDeleting: isPending, deleteError: error }
}
