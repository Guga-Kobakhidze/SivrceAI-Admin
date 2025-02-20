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
}

export interface ImageFieldElementProps extends FieldProps {
  label: string
  disabled?: boolean
  isMltiple?: boolean
  images: ImageType[]
  setImages: Dispatch<SetStateAction<ImageType[]>>
  name: string
}
