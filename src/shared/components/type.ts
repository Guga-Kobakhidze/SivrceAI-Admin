import { TextFieldProps } from '@mui/material'
import { ImageType, MultiImageType } from '@rootTypes'
import { Dispatch, SetStateAction } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

export interface FieldProps extends Omit<TextFieldProps, 'name'> {
  name: string
  label: string
  rows?: number
}

export interface OptionProps {
  options: { label: string; value: string }[]
  disabled?: boolean
  isMultiple?: boolean
}

export interface MultiImageFieldElementProps extends FieldProps {
  disabled?: boolean
  images: MultiImageType[]
  setImages: Dispatch<SetStateAction<MultiImageType[]>>
  errorMsg?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>
}

export interface SingleImageFieldElementProps
  extends Pick<MultiImageFieldElementProps, 'label' | 'name' | 'disabled'> {
  image: ImageType | null
  setImage: Dispatch<SetStateAction<ImageType[]>>
}
