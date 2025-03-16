import { toast } from 'react-toastify'
import { REQ_KEYS } from '@queryKeys'
import { useMutation } from '@tanstack/react-query'
import { apiImageClient } from '@axiosInstance'

type ImageItem = { file: File; isMain?: boolean }
type ImagesType = ImageItem | ImageItem[]

const uploadImage = async ({
  images,
  context,
}: {
  images: ImagesType
  context: string
}): Promise<string[]> => {
  const formData = new FormData()

  formData.append('context', context)
  const imageArray = Array.isArray(images) ? images : [images]

  imageArray.forEach((image, index) => {
    formData.append('files', image.file)
    if (image.isMain !== undefined) {
      formData.append(`isMain_${index}`, String(image.isMain))
    }
  })

  const { data } = await apiImageClient.post<{ urls: string[] }>(
    REQ_KEYS.uploadImage,
    formData,
  )

  return data?.urls
}

export default function useImageUploader() {
  const { mutate, isPending } = useMutation({
    mutationFn: uploadImage,
    onSuccess: () => toast.success('Images uploaded successfully'),
    onError: () => toast.error('Something went wrong during image upload'),
  })

  return { uploadImages: mutate, isUploading: isPending }
}
