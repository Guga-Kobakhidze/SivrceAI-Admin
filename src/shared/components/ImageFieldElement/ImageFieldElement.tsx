import React from 'react'
import { Controller } from 'react-hook-form'
import { useFormContext } from '@widgets/FormProvider'
import { ImageFieldElementProps } from '../type'
import { Box, FormControl, FormLabel, TextField } from '@mui/material'
import { StyledImageBox } from './style'

const ImageFieldElement = ({
  name,
  label,
  imageBlob,
  multiple = false,
}: ImageFieldElementProps) => {
  const { control } = useFormContext()

  return (
    <FormControl>
      <FormLabel sx={{ mb: 0.5 }}>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({
          field: { value, onChange, ...field },
          fieldState: { error, invalid },
        }) => {
          let previews: string[] = []
          if (Array.isArray(value)) {
            previews = value.map((file: File | string) => {
              if (file instanceof File) {
                const blob = URL.createObjectURL(file)
                imageBlob.current.push(blob)
                return blob
              } else {
                return file
              }
            })
          } else if (value instanceof File) {
            const blob = URL.createObjectURL(value)
            previews.push(blob)
            imageBlob.current.push(blob)
          } else if (typeof value === 'string') {
            previews.push(value)
          }
          return (
            <React.Fragment>
              <TextField
                {...field}
                type="file"
                error={invalid}
                helperText={error?.message || ''}
                inputProps={{
                  accept: 'image/*',
                  multiple,
                }}
                onChange={event => {
                  const input = event.target as HTMLInputElement
                  if (input.files) {
                    const files = Array.from(input.files)
                    onChange(multiple ? files : files[0])
                  }
                }}
              />
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                {previews &&
                  previews.map((src, index) => (
                    <Box
                      key={index}
                      component="img"
                      sx={StyledImageBox}
                      src={src}
                      alt={`preview-${index}`}
                    />
                  ))}
              </Box>
            </React.Fragment>
          )
        }}
      />
    </FormControl>
  )
}

export default ImageFieldElement
