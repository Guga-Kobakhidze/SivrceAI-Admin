export interface FieldProps {
  name: string
  label: string
  rows?: number
}

export interface OptionProps {
  options: { label: string; value: string }[]
}

export interface ImageFieldElementProps extends FieldProps {
  imageBlob: React.MutableRefObject<string[]>
  multiple?: boolean
}
