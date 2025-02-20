import { toast } from 'react-toastify'
import { apiClient } from '@axiosInstance'
import { REQ_KEYS, QUERY_KEYS } from '@queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DeleteRequest, ErrorResponse, IApiError } from '@rootTypes'

const deleteInteriorQuestion = async ({
  id,
}: DeleteRequest): Promise<ErrorResponse> => {
  try {
    const response = await apiClient.delete(
      `${REQ_KEYS.deleteInteriorQuestion}${id}`,
    )
    return response.data
  } catch (error: any) {
    throw new Error(error?.message || 'Failed to delete question')
  }
}

export default function useDeleteInteriorQuestion() {
  const queryQlient = useQueryClient()

  const { mutate, isPending, error } = useMutation<
    ErrorResponse,
    IApiError,
    DeleteRequest
  >({
    mutationFn: deleteInteriorQuestion,
    onSuccess: () => {
      toast.success('Question Deleted Successfully')
      queryQlient.invalidateQueries({
        queryKey: [QUERY_KEYS.INTERIOR_QUESTIONS],
      })
    },
  })

  return { deleteQuestion: mutate, isDeleting: isPending, deleteError: error }
}
