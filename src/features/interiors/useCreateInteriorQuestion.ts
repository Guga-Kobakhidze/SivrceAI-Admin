import { toast } from 'react-toastify'
import { apiClient } from '@axiosInstance'
import { REQ_KEYS, QUERY_KEYS } from '@queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateRequest, ErrorResponse, IApiError } from '@rootTypes'

const createInteriorQuestion = async ({
  data,
}: CreateRequest): Promise<ErrorResponse> => {
  try {
    const response = await apiClient.post(
      `${REQ_KEYS.addEditInteriorQuestion}`,
      data,
    )
    return response.data
  } catch (error: any) {
    throw new Error(error || 'Failed to Create question')
  }
}

export default function useCreateInteriorQuestion() {
  const queryQlient = useQueryClient()

  const { mutate, isPending, error } = useMutation<
    ErrorResponse,
    IApiError,
    CreateRequest
  >({
    mutationFn: createInteriorQuestion,
    onSuccess: () => {
      toast.success('Question Created Successfully')
      queryQlient.invalidateQueries({
        queryKey: [QUERY_KEYS.INTERIOR_QUESTIONS],
      })
    },
  })

  return { createQuestion: mutate, isCreating: isPending, createError: error }
}
