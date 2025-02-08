import { Box, Button, Grid2 } from '@mui/material'
import { useForm } from 'react-hook-form'
import FormProvider from '@widgets/FormProvider'
import { TextFieldElement } from '@components'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@context/UserContext/userContext'
import { EMAIL_ADDRESS, PASSWORD } from '@config'
import { setAuthParams } from '@utils'
import { toast } from 'react-toastify'
import { textFieldStyles } from './LoginForm.style'

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
    if (data.email !== EMAIL_ADDRESS && data.password !== PASSWORD) {
      toast.error('Email or password is incorrect. Please try again.')
      return
    }

    setAuthParams(data.email, true)
    setIsAuthenticated(true)
    navigate('/')
  }

  return (
    <Box>
      <FormProvider control={control}>
        <Box component="form" onSubmit={handleSubmit(submit)}>
          <Grid2 container spacing={3}>
            <Grid2 size={12}>
              <TextFieldElement
                name="email"
                label="Email"
                {...textFieldStyles}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextFieldElement
                label="Password"
                name="password"
                type="password"
                {...textFieldStyles}
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
