import { ISpot } from './Spots.config'
import { CityEnum } from '@enums'
import { MultiImageType } from 'src/shared/components/type'
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
    event_type: [],
    people_range: [],
    price_range: [],
  }

  const { uploadImages } = useImageUploader()

  const onSubmit = (data: ISpot, images: MultiImageType[]) => {
    const districts = ['ANY', ...data.district]
    uploadImages(
      { images, context: 'object' },
      {
        onSuccess: images => {
          console.log({ ...data, district: districts, images: images })
        },
      },
    )
  }

  return <SportForm defaultValues={defaultValues} onSubmit={onSubmit} />
}

export default SpotCreate
