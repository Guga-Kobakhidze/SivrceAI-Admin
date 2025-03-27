import { toast } from 'react-toastify'
import { apiClient } from '@axiosInstance'
import { SubmitForm } from './Spots.config'
import { REQ_KEYS, QUERY_KEYS } from '@queryKeys'
import { ErrorResponse, IApiError } from '@rootTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const createSpot = async ({ data, image }: SubmitForm): Promise<ErrorResponse> => {
  const formData = {...data, image: image}
  
  try {
    const response = await apiClient.post(`${REQ_KEYS.addEditSpot}`, formData)
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
