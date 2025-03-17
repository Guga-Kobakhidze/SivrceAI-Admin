import React from 'react'
import ImageUploadTexField from '../ImageUploadTexField'
import { AddIcon } from '@icons'
import { Box, Typography } from '@mui/material'
import { SingleImageFieldElementProps } from '../../type'
import { StyledImageUplaodBox, StyledImageUploadBox } from '../style'

const SingleImageFieldElement = ({
  name,
  image,
  index,
  disabled,
  setImage,
}: SingleImageFieldElementProps & { index: number }) => {
  console.log(image)

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(prev => {
        const newImages = [...prev]
        newImages[index] = { file }
        return newImages
      })
    }
  }

  return (
    <React.Fragment>
      <ImageUploadTexField
        name={name}
        id={`${name}-${index}`}
        onUpload={onUpload}
        disabled={disabled}
      />
      <StyledImageUplaodBox>
        <Box width="100%" component="label" htmlFor={`${name}-${index}`}>
          <StyledImageUploadBox bgcolor="#EFEFEF">
            <Box>
              <AddIcon />
            </Box>
            <Typography component="span">Upload Image</Typography>
          </StyledImageUploadBox>
        </Box>
        {image && (
          <Box
            width={150}
            height={150}
            component="img"
            alt="uploaded"
            src={
              typeof image.file === 'string'
                ? image.file
                : URL.createObjectURL(image.file)
            }
          />
        )}
      </StyledImageUplaodBox>
    </React.Fragment>
  )
}

export default SingleImageFieldElement
