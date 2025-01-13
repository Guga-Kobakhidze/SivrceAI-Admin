import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'

const SpostsPage = lazy(() => import('./pages/SpotsPage'))
const SpotsCreate = lazy(() => import('./features/spots/SpotsCreate'))
const SpotsEdit = lazy(() => import('./features/spots/SpotsEdit'))

const UsersPage = lazy(() => import('./pages/UsersPage'))
const CreateUser = lazy(() => import('./features/users/UsersCreate'))
const EditUser = lazy(() => import('./features/users/UsersEdit'))

const PageNotFound = lazy(() => import('./pages/PageNotFound'))

const Router = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/">
          <Route index element={<UsersPage />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/edit-user/:userId" element={<EditUser />} />
        </Route>
        <Route path="/spots">
          <Route index element={<SpostsPage />} />
          <Route path="/spots/create" element={<SpotsCreate />} />
          <Route path="/spots/edit/:spotId" element={<SpotsEdit />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default Router
