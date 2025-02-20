import { toast } from 'react-toastify'
import { ILogin } from './Auth.config'
import { ROUTES } from '@constants'
import { useForm } from 'react-hook-form'
import { useLogin } from './useLogin'
import { useNavigate } from 'react-router-dom'
import { setAuthToken } from '@utils'
import { textFieldStyles } from './LoginForm.style'
import { TextFieldElement } from '@components'
import { Box, Button, CircularProgress, Grid2 } from '@mui/material'
import FormProvider from '@widgets/FormProvider'

const LoginForm = () => {
  const navigate = useNavigate()
  const methods = useForm<ILogin>({
    defaultValues: {
      grant_type: '',
      username: '',
      password: '',
      scope: '',
      client_id: '',
      client_secret: '',
    },
  })

  const { handleSubmit, control } = methods
  const { login, loading, error } = useLogin()

  const handleLogin = (values: ILogin) => {
    login(values, {
      onSuccess: result => {
        setAuthToken(result.accessToken, result.refreshToken)
        navigate(ROUTES.usersPage)
      },
      onError: (errors: any) => {
        if (
          errors.response.data.status === 404 ||
          errors.response.data.success === false
        ) {
          return toast.error('Email or Password is incorrect')
        } else toast.error(error?.message)
      },
    })
  }

  return (
    <Box>
      <FormProvider control={control}>
        <Box component="form" onSubmit={handleSubmit(handleLogin)}>
          <Grid2 container spacing={3}>
            <Grid2 size={12}>
              <TextFieldElement
                name="username"
                label="User Name"
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
                {loading && (
                  <CircularProgress
                    sx={{ ml: 1, height: '10px' }}
                    color="inherit"
                    size="15px"
                  />
                )}
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </FormProvider>
    </Box>
  )
}

export default LoginForm
