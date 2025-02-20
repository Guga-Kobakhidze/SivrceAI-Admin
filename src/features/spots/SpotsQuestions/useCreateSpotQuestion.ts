import { toast } from 'react-toastify'
import { axiosInstance } from '@config'
import { REQ_KEYS, QUERY_KEYS } from '@queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateRequest, ErrorResponse, IApiError } from '@rootTypes'

const createSpotQuestion = async ({
  data,
}: CreateRequest): Promise<ErrorResponse> => {
  try {
    const response = await axiosInstance.post(
      `${REQ_KEYS.addEditSpotQuestion}`,
      data,
    )
    return response.data
  } catch (error: any) {
    throw new Error(error || 'Failed to Create question')
  }
}

export default function useCreateSpotQuestion() {
  const queryQlient = useQueryClient()

  const { mutate, isPending, error } = useMutation<
    ErrorResponse,
    IApiError,
    CreateRequest
  >({
    mutationFn: createSpotQuestion,
    onSuccess: () => {
      toast.success('Question Created Successfully')
      queryQlient.invalidateQueries({
        queryKey: [QUERY_KEYS.SPOT_QUESTIONS],
      })
    },
  })

  return { createQuestion: mutate, isCreating: isPending, createError: error }
}
