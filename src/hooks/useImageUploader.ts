import { toast } from 'react-toastify'
import { REQ_KEYS } from '@queryKeys'
import { MultiImageType } from '@rootTypes'
import { useMutation } from '@tanstack/react-query'
import { apiImageClient } from '@axiosInstance'

type ImageItem = { file: File; isMain?: boolean }
type ImagesType = ImageItem | ImageItem[]

const uploadImage = async ({
  images,
  context,
}: {
  images: File[] | MultiImageType[]
  context: string
}): Promise<string[]> => {
  const formData = new FormData()

  if (Array.isArray(images)) {
    images.forEach(image => {
      if (image instanceof File) {
        formData.append('files', image)
      } else {
        formData.append('files', image.file)
        formData.append('isMain', image.isMain.toString())
      }
    })
  }

  formData.append('context', context)
  const { data } = await apiImageClient.post(REQ_KEYS.uploadImage, formData)
  const urls: string[] = data.urls

  return urls
}

export default function useImageUploader() {
  const { mutate, isPending } = useMutation({
    mutationFn: uploadImage,
    onSuccess: () => toast.success('Images uploaded successfully'),
    onError: () => toast.error('Something went wrong during image upload'),
  })

  return { uploadImages: mutate, isUploading: isPending }
}
