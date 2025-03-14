import { apiImageClient } from '@axiosInstance'
import { REQ_KEYS } from '@queryKeys'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const uploadImage = async ({
  images,
  context,
}: {
  images: File[]
  context: string
}): Promise<string[]> => {
  const formData = new FormData()
  images.forEach(image => formData.append('files', image))
  formData.append('context', context)

  const { data } = await apiImageClient.post(REQ_KEYS.uploadImage, formData)
  return data
}

export default function useImageUploader() {
  const { mutate, isPending } = useMutation({
    mutationFn: uploadImage,
    onSuccess: () => toast.success('images uploaded successfully'),
    onError: () => toast.error('something went wrong during uploading images'),
  })

  return { uploadImages: mutate, isUploading: isPending }
}
