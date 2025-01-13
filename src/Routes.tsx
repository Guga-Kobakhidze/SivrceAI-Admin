import { lazy } from 'react'
import { AuthLayout } from '@layouts'
import { Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import HiddenRoute from './routes/HiddenRoute'
import AuthenticatedRoute from './routes/AuthenticatedRoute'

const Login = lazy(() => import('@features/auth/Login'))

const SpostsPage = lazy(() => import('./pages/SpotsPage'))
const SpotsCreate = lazy(() => import('@features/spots/SpotsCreate'))
const SpotsEdit = lazy(() => import('@features/spots/SpotsEdit'))

const UsersPage = lazy(() => import('./pages/UsersPage'))
const CreateUser = lazy(() => import('@features/users/UsersCreate'))
const EditUser = lazy(() => import('@features/users/UsersEdit'))

const PageNotFound = lazy(() => import('./pages/PageNotFound'))

const Router = () => {
  return (
    <Routes>
      <Route
        element={
          <AuthenticatedRoute>
            <AppLayout />
          </AuthenticatedRoute>
        }
      >
        <Route path="/users">
          <Route index element={<UsersPage />} />
          <Route path="/users/create-user" element={<CreateUser />} />
          <Route path="/users/edit-user/:userId" element={<EditUser />} />
        </Route>

        <Route path="/spots">
          <Route index element={<SpostsPage />} />
          <Route path="/spots/create" element={<SpotsCreate />} />
          <Route path="/spots/edit/:spotId" element={<SpotsEdit />} />
        </Route>
      </Route>

      <Route
        element={
          <HiddenRoute>
            <AuthLayout />
          </HiddenRoute>
        }
      >
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default Router
