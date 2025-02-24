import { apiImageClient } from '@axiosInstance'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const uploadImage = async (images: File[]): Promise<string[]> => {
  const formData = new FormData()
  images.forEach(image => formData.append('file', image))

  const { data } = await apiImageClient.post(
    'https://www.facebbookasdokdsa.com',
    formData,
  )
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
