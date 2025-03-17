import React from 'react'
import ImageUploadTexField from '../ImageUploadTexField'
import { toast } from 'react-toastify'
import { AddIcon, CloseIcon } from '@icons'
import { Box, Typography, Grid2, Tooltip } from '@mui/material'
import { MultiImageFieldElementProps } from '../../type'
import {
  StyledImageContent,
  StyledImageUplaodBox,
  StyledImageUploadBox,
} from '../style'

const MultiImageFieldElement = ({
  name,
  label,
  images,
  disabled,
  errorMsg,
  setImages,
}: MultiImageFieldElementProps) => {
  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).map(file => ({
      file,
      isMain: false,
    }))
    const totalImages = images.length + files.length

    if (totalImages > 8) {
      toast.error('You can upload only 8 images')
      files.splice(8 - images.length)
    }

    setImages(prevImages => [...prevImages, ...files])
  }

  const onImageDelete = (index: number) =>
    setImages(prev => prev.filter((_, i) => i !== index))
  const handleMainImg = (index: number) =>
    setImages(prev => prev.map((img, i) => ({ ...img, isMain: i === index })))

  return (
    <React.Fragment>
      <ImageUploadTexField
        id={name}
        name={name}
        onUpload={onUpload}
        disabled={disabled}
      />
      <StyledImageUplaodBox>
        <Box width="100%" component="label" htmlFor={name}>
          <StyledImageUploadBox bgcolor="#EFEFEF">
            <Box>
              <AddIcon />
            </Box>
            <Typography component="span">{label}</Typography>
          </StyledImageUploadBox>
        </Box>
        <Grid2 container spacing={2}>
          {images?.slice(0, 8).map((img, index) => (
            <Tooltip title="Select as main image" followCursor key={index}>
              <StyledImageContent
                size={{ xs: 12, sm: 6, md: 2 }}
                onClick={() => handleMainImg(index)}
                ismain={img.isMain ? 'true' : null}
              >
                <Box
                  className="closeIcon"
                  onClick={e => {
                    e.stopPropagation()
                    onImageDelete(index)
                  }}
                >
                  <CloseIcon />
                </Box>
                <img
                  src={
                    typeof img.file === 'string'
                      ? img.file
                      : URL.createObjectURL(img.file)
                  }
                  alt={`uploaded image ${index}`}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </StyledImageContent>
            </Tooltip>
          ))}
        </Grid2>
      </StyledImageUplaodBox>
      <Typography fontSize={12} color="#9d3232" ml={2}>
        {typeof errorMsg === 'string' ? errorMsg : ''}
      </Typography>
    </React.Fragment>
  )
}

export default MultiImageFieldElement
