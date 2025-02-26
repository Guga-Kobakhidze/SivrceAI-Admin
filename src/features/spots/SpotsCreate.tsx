import { CityEnum } from '@enums'
import SportForm from './SportsForm'
import useImageUploader from '@hooks/useImageUploader'

const SpotCreate = () => {
  const defaultValues = {
    name: '',
    name_ge: '',
    description: '',
    description_ge: '',
    email: '',
    website: '',
    phone: '',
    address: '',
    images: [],
    city: CityEnum.Tbilisi,
    district: [],
    category: [],
    subcategory: [],
    cuisine_type: [],
    people_range: [],
    price_range: [],
  }

  const { uploadImages } = useImageUploader()

  const onSubmit = (data: any, images: File[]) => {
    uploadImages(images)
    const districts = ['ANY', ...data.district]
    console.log({ ...data, district: districts, images: images })
  }

  return <SportForm defaultValues={defaultValues} onSubmit={onSubmit} />
}

export default SpotCreate
