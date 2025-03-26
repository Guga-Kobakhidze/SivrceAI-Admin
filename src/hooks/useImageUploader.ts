import { toast } from 'react-toastify'
import { REQ_KEYS } from '@queryKeys'
import { useMutation } from '@tanstack/react-query'
import { apiImageClient } from '@axiosInstance'
import { ImageItem, MultiImageType } from '@rootTypes'

type ApiResponse = { images: ImageItem[] }

const uploadImage = async ({
  images,
  context,
}: {
  images: File[] | MultiImageType[]
  context: string
}): Promise<ImageItem[]> => {
  const formData = new FormData()

  images.forEach(image => {
    if (image instanceof File) {
      formData.append('files', image)
      formData.append('isMain', 'false')
    } else {
      formData.append('files', image.file)
      if (typeof image.isMain === 'boolean') {
        formData.append('isMain', image.isMain.toString())
      }
    }
  })

  formData.append('context', context)

  const { data } = await apiImageClient.post<ApiResponse>(
    REQ_KEYS.uploadImage,
    formData,
  )

  if (!data?.images || !Array.isArray(data.images)) {
    throw new Error('Invalid response format from API')
  }

  return data.images
}

export default function useImageUploader() {
  const { mutate, isPending } = useMutation({
    mutationFn: uploadImage,
    onSuccess: () => toast.success('Images uploaded successfully'),
    onError: () => toast.error('Something went wrong during image upload'),
  })

  return { uploadImages: mutate, isUploading: isPending }
}
