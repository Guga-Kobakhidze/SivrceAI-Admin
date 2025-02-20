// import FullPageLoading from '@widgets/FullPageLoading'
import { PropsWithChildren } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useUser } from '@features/auth/useUser'
// import { ROUTES } from '@constants'

const HiddenRoute: React.FC<PropsWithChildren> = ({ children }) => {
  // const { isAuthenticated, loading } = useUser()
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (!loading && isAuthenticated)
  //     navigate(ROUTES.usersPage, { replace: true })
  // }, [isAuthenticated, loading, navigate])

  // if (loading) return <FullPageLoading />
  // if (!isAuthenticated)

  return <>{children}</>
}

export default HiddenRoute
