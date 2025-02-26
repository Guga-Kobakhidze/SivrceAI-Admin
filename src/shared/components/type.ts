import { TextFieldProps } from '@mui/material'
import { ImageType } from '@rootTypes'
import { Dispatch, SetStateAction } from 'react'

export interface FieldProps extends Omit<TextFieldProps, 'name'> {
  name: string
  label: string
  rows?: number
}

export interface OptionProps {
  options: { label: string; value: string }[]
  disabled?: boolean
  isMltiple?: boolean
}

export interface MultiImageFieldElementProps extends FieldProps {
  label: string
  disabled?: boolean
  images: ImageType[]
  setImages: Dispatch<SetStateAction<ImageType[]>>
  name: string
}

export interface SingleImageFieldElementProps
  extends Pick<MultiImageFieldElementProps, 'label' | 'name' | 'disabled'> {
  image: ImageType | null
  setImage: Dispatch<SetStateAction<ImageType[]>>
}
