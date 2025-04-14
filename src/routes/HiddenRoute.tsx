import { ROUTES } from '../shared/utils/constants'
import { useUser } from '@features/auth/useUser'
import { useNavigate } from 'react-router-dom'
import { PropsWithChildren, useEffect } from 'react'
import FullPageLoading from '@widgets/FullPageLoading'

const HiddenRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, loading } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && isAuthenticated)
      navigate(ROUTES.usersPage, { replace: true })
  }, [isAuthenticated, loading, navigate])

  if (loading) return <FullPageLoading />
  if (!isAuthenticated) return <>{children}</>
}

export default HiddenRoute
