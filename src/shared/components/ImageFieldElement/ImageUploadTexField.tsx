import { TextField } from '@mui/material'

interface ImageUploaderTexFieldProps {
  name: string
  disabled?: boolean
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  index?: number
  id: string
}

const ImageUploadTexField = ({
  id,
  name,
  disabled,
  onUpload,
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
        },
      }}
    />
  )
}

export default ImageUploadTexField
