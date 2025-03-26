import { toast } from 'react-toastify'
import { apiClient } from '@axiosInstance'
import { REQ_KEYS, QUERY_KEYS } from '@queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ErrorResponse, IApiError } from '@rootTypes'
import { SubmitForm } from './Spots.config'

const createSpot = async ({ data }: SubmitForm): Promise<ErrorResponse> => {
  try {
    const response = await apiClient.post(`${REQ_KEYS.addEditSpot}`, data)
    return response.data
  } catch (error: any) {
    throw new Error(error || 'Failed to Create spot')
  }
}

export default function useCreateSpot() {
  const queryQlient = useQueryClient()
  const { mutate, isPending, error } = useMutation<
    ErrorResponse,
    IApiError,
    SubmitForm
  >({
    mutationFn: createSpot,
    onSuccess: () => {
      toast.success('Spot Created Successfully')
      queryQlient.invalidateQueries({
        queryKey: [QUERY_KEYS.SPOTS],
      })
    },
  })

  return { createSpot: mutate, isCreating: isPending, createError: error }
}
