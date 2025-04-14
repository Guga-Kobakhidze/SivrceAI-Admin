import { TextField } from '@mui/material'

interface ImageUploaderTexFieldProps {
  name: string
  id: string
  index?: number
  disabled?: boolean
  isMultiple?: boolean
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ImageUploadTexField = ({
  id,
  name,
  disabled,
  onUpload,
  isMultiple = false,
}: ImageUploaderTexFieldProps) => {
  return (
    <TextField
      name={name}
      label="Upload Image"
      disabled={disabled}
      onChange={onUpload}
      sx={{ display: 'none' }}
      type="file"
      fullWidth
      id={id}
      slotProps={{
        htmlInput: {
          accept: 'image/*',
          multiple: isMultiple,
        },
      }}
    />
  )
}

export default ImageUploadTexField
