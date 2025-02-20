import React, { PropsWithChildren } from 'react'
// import { ROUTES } from '@constants'
// import { useNavigate } from 'react-router-dom'
// import { useUser } from '@features/auth/useUser'

const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
  // const { isAuthenticated } = useUser()
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (!isAuthenticated) navigate(ROUTES.userLogin, { replace: true })
  // }, [isAuthenticated, navigate])

  // if (isAuthenticated)

  return <React.Fragment>{children}</React.Fragment>
}

export default AuthenticatedRoute
