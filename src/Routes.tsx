import { lazy } from 'react'
import { ROUTES } from '@constants'
import { AuthLayout } from '@layouts'
import { Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import HiddenRoute from './routes/HiddenRoute'
import AuthenticatedRoute from './routes/AuthenticatedRoute'
import ConfirmDialogContextProvider from '@context/confirmDialog'

const Login = lazy(() => import('@features/auth/Login'))

const SpostsPage = lazy(() => import('./pages/SpotsPage'))
const SpotsCreate = lazy(() => import('@features/spots/SpotsCreate'))
const SpotsEdit = lazy(() => import('@features/spots/SpotsEdit'))

const InteriersPage = lazy(() => import('./pages/InteriorPage'))

const UsersPage = lazy(() => import('./pages/UsersPage'))
const CreateUser = lazy(() => import('@features/users/UsersCreate'))
const EditUser = lazy(() => import('@features/users/UsersEdit'))

const PageNotFound = lazy(() => import('./pages/PageNotFound'))

const Router = () => {
  return (
    <ConfirmDialogContextProvider>
      <Routes>
        <Route
          element={
            <AuthenticatedRoute>
              <AppLayout />
            </AuthenticatedRoute>
          }
        >
          <Route path="/">
            <Route index element={<UsersPage />} />
            <Route path={ROUTES.createUser} element={<CreateUser />} />
            <Route path={`${ROUTES.editUser}/:userId`} element={<EditUser />} />
          </Route>

          <Route path={ROUTES.spotsPage}>
            <Route index element={<SpostsPage />} />
            <Route path={ROUTES.createSpot} element={<SpotsCreate />} />
            <Route
              path={`${ROUTES.editSpot}/:spotId`}
              element={<SpotsEdit />}
            />
          </Route>

          <Route path={ROUTES.interiorPage} element={<InteriersPage />} />
        </Route>

        <Route
          element={
            <HiddenRoute>
              <AuthLayout />
            </HiddenRoute>
          }
        >
          <Route path={ROUTES.userLogin} element={<Login />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ConfirmDialogContextProvider>
  )
}

export default Router
