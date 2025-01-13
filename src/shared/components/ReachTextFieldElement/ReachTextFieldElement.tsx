import RichEditor from './ReachEditor'
import { Box } from '@mui/material'
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
              <p
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '15px',
                  color: '#F44335',
                  fontSize: '0.75rem',
                  fontWeight: 300,
                }}
              >
                {error.message}
              </p>
            )}
          </Box>
        )
      }}
    />
  )
}

export default ReachTextFieldElement
