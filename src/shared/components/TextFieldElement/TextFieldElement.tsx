import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { FieldProps } from '../type'
import { useFormContext } from '@widgets/FormProvider'

const TextFieldElement = ({ name, label, ...rest }: FieldProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          fullWidth
          {...rest}
          {...field}
          label={label}
          variant="outlined"
          id={`outlined-basic-${name}`}
          error={!!error}
          helperText={!!error && error.message}
        />
      )}
    />
  )
}

export default TextFieldElement
