import { CityEnum } from '@enums'
import { ImageItem, MultiImageType } from '@rootTypes'

export const defaultValues = {
  name: '',
  name_ge: '',
  description: '',
  description_ge: '',
  email: '',
  website: '',
  phone: '',
  address: '',
  image: [],
  city: CityEnum.Tbilisi,
  district: [],
  category: [],
  subcategory: [],
  event_type: [],
  people_range: [],
  price_range: [],
  additional: '',
}

export interface ISpot {
  name: string
  name_ge?: string
  description: string
  description_ge: string
  email: string
  website: string
  phone: string
  address: string
  image: MultiImageType[]
  city: string
  district?: string[]
  category: string[] | string
  subcategory: string[] | string
  event_type?: string[]
  people_range: string[]
  price_range: string[]
  additional?: string
}

export interface ISpotResponse {
  id: string
  name: string
  name_ge?: string
  description: string
  description_ge: string
  email: string
  website: string
  phone: string
  address: string
  image: MultiImageType[]
  city: string
  district: string[]
  category: string[] | string
  subcategory: string[] | string
  event_type?: string[]
  people_range: string[]
  price_range: string[]
  additional: string
}

export type ISpots = {
  items: ISpotResponse[]
  page: number
  pages: number
  size: number
  total: number
}

export interface SubmitForm {
  data: ISpot
  image: ImageItem[]
}

export interface DeleteRequest {
  id: string
}

export interface SpotsFormProps {
  defaultValues: ISpot
  onSubmit: (data: SubmitForm) => void
  onDelete?: (id: string) => void
  isEdit?: boolean
  loading: boolean
}

export type ActiveTabKey = 0 | 1

export type TabOption = {
  Actions: React.ComponentType
  Table: React.ComponentType
}
