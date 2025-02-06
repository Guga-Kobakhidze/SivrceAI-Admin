import { TextFieldProps } from '@mui/material'

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
  imageBlob: React.MutableRefObject<string[]>
  multiple?: boolean
}
