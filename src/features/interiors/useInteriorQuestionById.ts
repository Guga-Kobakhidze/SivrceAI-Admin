import { QKeys } from '@queryKeys'
import { useQuery } from '@tanstack/react-query'
import { IQuestion } from '@rootTypes'
import { axiosInstance, INTERIOR_QUESTION_ID } from '@config'

const interiorQuestionById = async (id: string) => {
  const response = await axiosInstance.get(
    `${QKeys.getInteriorQuestionById}${id}/`,
  )
  return response.data
}

export const useInterioriQuestionById = (id: string) => {
  const { data, error, isPending, refetch } = useQuery<IQuestion[]>({
    queryKey: [INTERIOR_QUESTION_ID, { id }],
    queryFn: () => interiorQuestionById(id),
    enabled: !!id,
  })

  const question = data?.[0]
  return { question, error, loading: isPending, refetch }
}
