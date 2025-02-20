import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { ImageFieldElementProps } from '../type'
import { Box, Grid2, TextField, Typography } from '@mui/material'
import {
  StyledImageContent,
  StyledImageUplaodBox,
  StyledImageUploadBox,
} from './style'

const ImageFieldElement = ({
  label,
  disabled,
  isMltiple = true,
  images,
  setImages,
  name,
}: ImageFieldElementProps) => {
  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const totalImages = images.length + files.length

    if (totalImages > 8) {
      console.log('here')
      toast.error('You can upload only 8 images')
      files.splice(8 - images.length)
    }

    setImages(prevImages => [...prevImages, ...files])
  }

  const onImageDelete = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <>
      <TextField
        name={name}
        disabled={disabled}
        onChange={onUpload}
        sx={{ display: 'none' }}
        type="file"
        fullWidth
        id="uploadImage"
        slotProps={{
          htmlInput: {
            multiple: isMltiple,
            accept: 'image/*',
          },
        }}
      />
      <StyledImageUplaodBox>
        <Box width="100%" component="label" htmlFor="uploadImage">
          <StyledImageUploadBox bgcolor="#EFEFEF">
            <Box>
              <AddIcon />
            </Box>
            <Typography component="span">{label}</Typography>
          </StyledImageUploadBox>
        </Box>
        <Grid2 container spacing={2}>
          {images.slice(0, 8).map((img, index) => (
            <StyledImageContent size={{ xs: 12, sm: 6, md: 2 }} key={index}>
              <Box className="closeIcon" onClick={() => onImageDelete(index)}>
                <CloseIcon />
              </Box>
              <img
                src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                alt={`uploaded image ${index}`}
              />
            </StyledImageContent>
          ))}
        </Grid2>
      </StyledImageUplaodBox>
    </>
  )
}

export default ImageFieldElement
