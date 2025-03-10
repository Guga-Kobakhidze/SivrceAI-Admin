import React from 'react'
import ImageUploadTexField from '../ImageUploadTexField'
import { toast } from 'react-toastify'
import { AddIcon, CloseIcon } from '@icons'
import { Box, Grid2, Typography } from '@mui/material'
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
  setImages,
}: MultiImageFieldElementProps) => {
  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const totalImages = images.length + files.length

    if (totalImages > 8) {
      toast.error('You can upload only 8 images')
      files.splice(8 - images.length)
    }

    setImages(prevImages => [...prevImages, ...files])
  }

  const onImageDelete = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

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
          {images?.slice(0, 8).map((img, index) => {
            if (!img) return
            return (
              <StyledImageContent size={{ xs: 12, sm: 6, md: 2 }} key={index}>
                <Box className="closeIcon" onClick={() => onImageDelete(index)}>
                  <CloseIcon />
                </Box>
                <img
                  src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                  alt={`uploaded image ${index}`}
                />
              </StyledImageContent>
            )
          })}
        </Grid2>
      </StyledImageUplaodBox>
    </React.Fragment>
  )
}

export default MultiImageFieldElement
