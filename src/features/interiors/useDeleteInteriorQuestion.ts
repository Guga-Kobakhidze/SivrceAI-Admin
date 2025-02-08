import { QKeys } from '@queryKeys'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance, INTERIOR_QUESTIONS } from '@config'
import { DeleteRequest, ErrorResponse, IApiError } from '@rootTypes'

const deleteInteriorQuestion = async ({
  id,
}: DeleteRequest): Promise<ErrorResponse> => {
  try {
    const response = await axiosInstance.delete(
      `${QKeys.deleteInteriorQuestion}${id}`,
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
        queryKey: [INTERIOR_QUESTIONS],
      })
    },
  })

  return { deleteQuestion: mutate, isDeleting: isPending, deleteError: error }
}
