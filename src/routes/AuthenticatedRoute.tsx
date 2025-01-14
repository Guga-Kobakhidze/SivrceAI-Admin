import { ROUTES } from '@constants'
import { useUser } from '@context/userContext'
import React, { PropsWithChildren, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthenticatedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) navigate(ROUTES.userLogin, { replace: true })
  }, [isAuthenticated, navigate])

  if (isAuthenticated) return <React.Fragment>{children}</React.Fragment>
}

export default AuthenticatedRoute
