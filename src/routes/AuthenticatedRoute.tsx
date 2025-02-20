import FullPageLoading from '@widgets/FullPageLoading'
import { useUser } from '@features/auth/useUser'
import { useNavigate } from 'react-router-dom'
import { PropsWithChildren, useEffect } from 'react'

const AuthenticatedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { loading, isAuthenticated } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate('/login', { replace: true })
  }, [isAuthenticated, loading, navigate])

  if (loading) return <FullPageLoading />
  if (isAuthenticated) return <>{children}</>
}

export default AuthenticatedRoute
