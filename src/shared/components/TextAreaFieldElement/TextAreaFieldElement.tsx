import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { FieldProps } from '../type'
import { useFormContext } from '@widgets/FormProvider'

const TextAreaFieldElement = ({ name, label, rows }: FieldProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          multiline
          {...field}
          fullWidth
          label={label}
          error={!!error}
          rows={rows ?? 4}
          variant="outlined"
          id="outlined-basic"
          helperText={!!error && error.message}
        />
      )}
    />
  )
}

export default TextAreaFieldElement
