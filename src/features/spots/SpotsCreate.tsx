import { CityEnum } from '@enums'
import SportForm from './SportsForm'

const SpotCreate = () => {
  const defaultValues = {
    name: '',
    title: '',
    description: '',
    description_ge: '',
    price_per_person: '',
    website: '',
    phone: '',
    address: '',
    image: [],
    city: CityEnum.Tbilisi,
    district: [],
    category: [],
    subcategory: [],
    cuisine_type: [],
    people_range: [],
    price_range: [],
  }

  const onSubmit = (data: any) => {
    const districts = ['ANY', ...data.district]
    console.log({ ...data, district: districts })
  }

  return <SportForm defaultValues={defaultValues} onSubmit={onSubmit} />
}

export default SpotCreate
