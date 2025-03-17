import RichEditor from './ReachEditor'
import { Box, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import { FieldProps } from '../type'
import { useFormContext } from '@widgets/FormProvider'

const ReachTextFieldElement = ({
  name,
  label,
  isSubmited,
}: FieldProps & { isSubmited?: boolean }) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <Box position="relative">
            <RichEditor
              label={label}
              onChange={onChange}
              defaultValue={value}
              isSubmited={isSubmited}
            />
            {!!error && (
              <Typography
                fontSize={12}
                color="#9d3232"
                sx={{ mt: '10px', ml: '10px' }}
              >
                {error.message}
              </Typography>
            )}
          </Box>
        )
      }}
    />
  )
}

export default ReachTextFieldElement
