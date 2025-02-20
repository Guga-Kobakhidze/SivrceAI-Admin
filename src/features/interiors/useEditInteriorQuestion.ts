import { toast } from 'react-toastify'
import { axiosInstance } from '@config'
import { REQ_KEYS, QUERY_KEYS } from '@queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateRequest, ErrorResponse, IApiError } from '@rootTypes'

const editInteriorQuestion = async ({
  id,
  data,
}: CreateRequest & { id: string }): Promise<ErrorResponse> => {
  try {
    const response = await axiosInstance.put(
      `${REQ_KEYS.addEditInteriorQuestion}${id}`,
      data,
    )
    return response.data
  } catch (error: any) {
    console.error(error)
    throw new Error('Failed to Edit question')
  }
}

export default function useEditInteriorQuestion() {
  const queryQlient = useQueryClient()

  const { mutate, isPending, error } = useMutation<
    ErrorResponse,
    IApiError,
    CreateRequest & { id: string }
  >({
    mutationFn: editInteriorQuestion,
    onSuccess: () => {
      toast.success('Question Edited Successfully')
      queryQlient.invalidateQueries({
        queryKey: [QUERY_KEYS.INTERIOR_QUESTIONS],
      })
    },
  })

  return { editQuestion: mutate, isEditing: isPending, editError: error }
}
