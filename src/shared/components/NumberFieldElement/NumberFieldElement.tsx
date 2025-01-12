import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { FieldProps } from '../type'
import { useFormContext } from '@widgets/FormProvider'

const NumberFieldElement = ({ name, label }: FieldProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type="number"
          label={label}
          error={!!error}
          variant="outlined"
          id="outlined-basic"
          helperText={!!error && error.message}
        />
      )}
    />
  )
}

export default NumberFieldElement
