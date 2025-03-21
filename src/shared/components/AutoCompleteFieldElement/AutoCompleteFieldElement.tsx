import { Autocomplete, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { FieldProps, OptionProps } from '../type'
import { useFormContext } from '@widgets/FormProvider'

const AutoCompleteFieldElement = ({
  name,
  label,
  options,
  disabled,
}: FieldProps & OptionProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          limitTags={2}
          options={options}
          getOptionLabel={option => option.label || ''}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          onChange={(_, selectedOption) => {
            field.onChange(selectedOption?.value || '')
          }}
          disabled={disabled}
          value={options.find(option => option.value === field.value) || null}
          renderInput={params => (
            <TextField
              {...params}
              label={label}
              error={!!error}
              helperText={error?.message}
              fullWidth
            />
          )}
        />
      )}
    />
  )
}

export default AutoCompleteFieldElement
