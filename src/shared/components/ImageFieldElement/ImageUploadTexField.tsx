import { TextField } from '@mui/material'

interface ImageUploaderTexFieldProps {
  name: string
  disabled?: boolean
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  index?: number
}

const ImageUploadTexField = ({
  name,
  disabled,
  onUpload,
  index,
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
      id={`uploadImage-${index}`}
      slotProps={{
        htmlInput: {
          accept: 'image/*',
        },
      }}
    />
  )
}

export default ImageUploadTexField
