import { MultiImageType } from '@rootTypes'

export interface ISpot {
  name: string
  name_ge?: string
  description: string
  description_ge: string
  email: string
  website: string
  phone: string
  address: string
  images: MultiImageType[]
  city: string
  district: string[]
  category: string
  subcategory: string[]
  event_type?: string[]
  people_range: string[]
  price_range: string[]
}
