import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import { Controller } from 'react-hook-form'
import { useFormContext } from '@widgets/FormProvider'
import { FieldProps, OptionProps } from '../type'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const MultiSelectFieldElemen = ({
  name,
  label,
  options,
  disabled,
  isMltiple = false,
}: FieldProps & OptionProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref } }) => (
        <Autocomplete
          multiple
          id={name}
          options={options}
          disabled={disabled}
          disableCloseOnSelect
          getOptionLabel={option => option.label}
          value={options.filter(option => value?.includes(option.value)) || []}
          onChange={(_, newValue) => {
            if (!isMltiple && newValue.length > 2) {
              newValue = newValue?.slice(0, 2)
            }
            onChange(newValue.map(item => item.value))
          }}
          renderOption={(props, option, { selected }) => {
            const { key, ...optionProps } = props
            return (
              <li key={key} {...optionProps}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.label}
              </li>
            )
          }}
          renderInput={params => (
            <TextField
              {...params}
              label={label}
              placeholder="Select options"
              inputRef={ref}
              fullWidth
            />
          )}
        />
      )}
    />
  )
}

export default MultiSelectFieldElemen
