import { Box, Button, Grid2 } from '@mui/material'
import { useForm } from 'react-hook-form'
import FormProvider from '@widgets/FormProvider'
import { TextFieldElement } from '@components'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@context/userContext'

const LoginForm = () => {
  const { setIsAuthenticated } = useUser()
  const navigate = useNavigate()
  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { handleSubmit, control } = methods

  const submit = (data: any) => {
    console.log(data)
    if (data.email !== '') {
      setIsAuthenticated(true)
      navigate('/users')
    }
  }

  return (
    <Box>
      <FormProvider control={control}>
        <Box component="form" onSubmit={handleSubmit(submit)}>
          <Grid2 container spacing={3}>
            <Grid2 size={12}>
              <TextFieldElement
                label="Email"
                name="email"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextFieldElement
                label="Password"
                name="password"
                type="password"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid2>
            <Grid2 size={6} m="auto">
              <Button type="submit" fullWidth variant="contained">
                Log in
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </FormProvider>
    </Box>
  )
}

export default LoginForm
