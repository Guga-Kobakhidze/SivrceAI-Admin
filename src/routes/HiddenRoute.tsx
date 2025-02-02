import React, { PropsWithChildren, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../shared/utils/constants'
import { useUser } from '@context/UserContext/userContext'

const HiddenRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate(ROUTES.usersPage, { replace: true })
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) return <React.Fragment>{children}</React.Fragment>
}

export default HiddenRoute
