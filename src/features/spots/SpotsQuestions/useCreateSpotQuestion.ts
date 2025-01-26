import { QKeys } from '@queryKeys'
import { toast } from 'react-toastify'
import { IApiError } from '@rootTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateRequest, ErrorResponse } from './SpotsQuestions.config'
import { axiosInstance, SPOT_QUESTIONS } from '@config'

const createSpotQuestion = async ({
  data,
}: CreateRequest): Promise<ErrorResponse> => {
  try {
    const response = await axiosInstance.post(
      `${QKeys.addEditSpotQuestion}`,
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
        queryKey: [SPOT_QUESTIONS],
      })
    },
  })

  return { createQuestion: mutate, isCreating: isPending, createError: error }
}
