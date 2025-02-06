import { StreetEnum } from '@enums'
import SportForm from './SportsForm'

const SpotCreate = () => {
  const defaultValues = {
    spotName: '',
    spotEmail: '',
    spotTitle: '',
    spotDescription: '',
    pricePerPerson: '',
    spotNumber: '',
    spotAddress: '',
    spotImages: [],
    street: StreetEnum.Tbilisi,
    district: '',
    category: '',
    subcategory: '',
    eventType: '',
    peopleRange: '',
    priceRange: '',
  }

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return <SportForm defaultValues={defaultValues} onSubmit={onSubmit} />
}

export default SpotCreate
