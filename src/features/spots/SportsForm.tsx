import { useForm } from 'react-hook-form'
import { Box, Grid2 } from '@mui/material'
import FormProvider from '@widgets/FormProvider'

const SportsForm = ({ defaultValues, onSubmit }: any) => {
  const methods = useForm({
    // resolver: yupResolver(),
    defaultValues: defaultValues,
  })

  const { control, handleSubmit } = methods

  const submit = (data: any) => {
    onSubmit(data)
  }

  return (
    <FormProvider control={control}>
      <Box component="form" onSubmit={handleSubmit(submit)}>
        <Grid2 container size={12} alignItems="start" spacing={3}></Grid2>
      </Box>
    </FormProvider>
  )
}

export default SportsForm
