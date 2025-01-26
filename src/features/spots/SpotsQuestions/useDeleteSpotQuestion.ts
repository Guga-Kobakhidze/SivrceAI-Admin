import { QKeys } from '@queryKeys'
import { toast } from 'react-toastify'
import { IApiError } from '@rootTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance, SPOT_QUESTIONS } from '@config'
import { DeleteRequest, ErrorResponse } from './SpotsQuestions.config'

const deleteSpotQuestion = async ({
  id,
}: DeleteRequest): Promise<ErrorResponse> => {
  try {
    const response = await axiosInstance.delete(
      `${QKeys.deleteSpotQuestion}${id}/`,
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
        queryKey: [SPOT_QUESTIONS],
      })
    },
  })

  return { deleteQuestion: mutate, isDeleting: isPending, deleteError: error }
}
