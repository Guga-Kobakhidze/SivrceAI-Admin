import { useUser } from '@context/UserContext'
import React, { PropsWithChildren, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthenticatedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated } = useUser()
  console.log(isAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) navigate('/login', { replace: true })
  }, [isAuthenticated, navigate])

  if (isAuthenticated) return <React.Fragment>{children}</React.Fragment>
}

export default AuthenticatedRoute
