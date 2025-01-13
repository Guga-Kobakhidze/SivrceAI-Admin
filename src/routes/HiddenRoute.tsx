import React, { PropsWithChildren, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../shared/utils/constants'
import { useUser } from '@context/UserContext'

const HiddenRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate(ROUTES.usersPage, { replace: true })
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) return <React.Fragment>{children}</React.Fragment>
}

export default HiddenRoute
