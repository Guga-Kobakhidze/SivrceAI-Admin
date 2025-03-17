import { apiImageClient } from '@axiosInstance'
import { REQ_KEYS } from '@queryKeys'
import { MultiImageType } from '@rootTypes'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

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
    onSuccess: () => toast.success('images uploaded successfully'),
    onError: () => toast.error('something went wrong during uploading images'),
  })

  return { uploadImages: mutate, isUploading: isPending }
}
