import { QKeys } from '@queryKeys'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance, INTERIOR_QUESTIONS } from '@config'
import { CreateRequest, ErrorResponse, IApiError } from '@rootTypes'

const createInteriorQuestion = async ({
  data,
}: CreateRequest): Promise<ErrorResponse> => {
  try {
    const response = await axiosInstance.post(
      `${QKeys.addEditInteriorQuestion}`,
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
        queryKey: [INTERIOR_QUESTIONS],
      })
    },
  })

  return { createQuestion: mutate, isCreating: isPending, createError: error }
}
