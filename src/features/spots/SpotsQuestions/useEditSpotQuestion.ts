import { toast } from 'react-toastify'
import { apiClient } from '@axiosInstance'
import { REQ_KEYS, QUERY_KEYS } from '@queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateRequest, ErrorResponse, IApiError } from '@rootTypes'

const editSpotQuestion = async ({
  id,
  data,
}: CreateRequest & { id: string }): Promise<ErrorResponse> => {
  try {
    const response = await apiClient.put(
      `${REQ_KEYS.addEditSpotQuestion}/${id}`,
      data,
    )
    return response.data
  } catch (error: any) {
    console.error(error)
    throw new Error('Failed to Edit question')
  }
}

export default function useEditSpotQuestion() {
  const queryQlient = useQueryClient()

  const { mutate, isPending, error } = useMutation<
    ErrorResponse,
    IApiError,
    CreateRequest & { id: string }
  >({
    mutationFn: editSpotQuestion,
    onSuccess: () => {
      toast.success('Question Edited Successfully')
      queryQlient.invalidateQueries({
        queryKey: [QUERY_KEYS.SPOT_QUESTIONS],
      })
    },
  })

  return { editQuestion: mutate, isEditing: isPending, editError: error }
}
