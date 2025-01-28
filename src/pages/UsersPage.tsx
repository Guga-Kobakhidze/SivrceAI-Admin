import { lazy } from 'react'

const Users = lazy(() => import('@features/users'))

const UsersPage = () => {
  return <Users />
}

export default UsersPage
