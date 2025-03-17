import { ISpot } from './Spots.config'
import { CityEnum } from '@enums'
import SportForm from './SportsForm'

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
    category: '',
    subcategory: [],
    event_type: [],
    people_range: [],
    price_range: [],
  }

  const onSubmit = (data: ISpot) => {
    console.log(data)
  }

  return <SportForm defaultValues={defaultValues} onSubmit={onSubmit} />
}

export default SpotCreate
