import { ImageType } from 'src/shared/components/type'

export interface ISpot {
  name: string
  name_ge: string
  description: string
  description_ge: string
  email: string
  website: string
  phone: string
  address: string
  images: ImageType[]
  city: string
  district: string[]
  category: string[]
  subcategory: string[]
  event_type: string[]
  people_range: string[]
  price_range: string[]
}
