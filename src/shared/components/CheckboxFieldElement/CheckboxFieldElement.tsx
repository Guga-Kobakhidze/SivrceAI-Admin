import React from 'react'
import { pxToRem } from '@helpers'
import { Controller } from 'react-hook-form'
import { FieldProps } from '../type'
import { useFormContext } from '@widgets/FormProvider'
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material'

const CheckboxFieldElement = ({ name, label }: FieldProps) => {
  const { control } = useFormContext()

  return (
    <FormGroup>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <React.Fragment>
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  checked={field.value}
                  sx={{
                    color: error ? '#d32f2f' : '',
                    '&.Mui-checked': { color: error ? '#d32f2f' : '' },
                  }}
                />
              }
              label={label}
              sx={{ color: error ? '#d32f2f' : '' }}
            />
            {error && (
              <Typography
                component="span"
                color="#d32f2f"
                fontSize={pxToRem(12)}
                pl={0.5}
              >
                {error.message}
              </Typography>
            )}
          </React.Fragment>
        )}
      />
    </FormGroup>
  )
}

export default CheckboxFieldElement
