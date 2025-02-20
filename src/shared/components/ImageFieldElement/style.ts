import { Box, Grid2, styled } from '@mui/material'

export const StyledImageBox = {
  width: '100px',
  height: '100px',
  objectFit: 'cover',
}

export const StyledImageUplaodBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  scrollbarWidth: 'none',
  gap: '8px',
  marginBottom: '16px',
})

export const StyledImageUploadBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  alignItems: 'center',
  borderRadius: '8px',
  padding: '16px 20px',
  cursor: 'pointer',
  border: '1px solid lightgrey',
})

export const StyledImageContent = styled(Grid2)({
  position: 'relative',
  borderRadius: '8px',
  overflow: 'hidden',
  maxHeight: 120,

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  '.closeIcon': {
    position: 'absolute',
    top: '2px',
    right: '2px',
    zIndex: 999,
    width: '25px',
    height: '25px',
    borderRadius: '50%',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    cursor: 'pointer',

    svg: {
      color: 'black',
    },
  },

  '&:hover': {
    '.closeIcon': {
      display: 'flex',
    },
  },
})
