import { lazy } from 'react'
import { ROUTES } from '@constants'
import { AuthLayout } from '@layouts'
import { Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import HiddenRoute from './routes/HiddenRoute'
import AuthenticatedRoute from './routes/AuthenticatedRoute'
import ConfirmDialogContextProvider from '@context/confirmDialog'

const Login = lazy(() => import('@features/auth/Login'))

const SpotsTable = lazy(() => import('./pages/SpotsPage'))
const SpotsCreate = lazy(() => import('@features/spots/SpotsCreate'))
const SpotsEdit = lazy(() => import('@features/spots/SpotsEdit'))
const SpotsQuesetionEdit = lazy(
  () => import('@features/spots/SpotsQuestions/SpotQuestionEdit'),
)
const SpotsQuesetionCreate = lazy(
  () => import('@features/spots/SpotsQuestions/SpotsQuestionCreate'),
)

const InteriersPage = lazy(() => import('./pages/InteriorPage'))
const InteriorQuestionCreate = lazy(
  () => import('@features/interiors/InteriorQuestionCreate'),
)
const InteriorQuestionEdit = lazy(
  () => import('@features/interiors/InteriorQuestionEdit'),
)

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

          <Route path={ROUTES.spotsTable}>
            <Route index element={<SpotsTable />} />
            <Route path={ROUTES.createSpot} element={<SpotsCreate />} />
            <Route
              path={`${ROUTES.editSpot}/:spotId`}
              element={<SpotsEdit />}
            />
            <Route
              path={ROUTES.createSpotQuestion}
              element={<SpotsQuesetionCreate />}
            />
            <Route
              path={`${ROUTES.editSpotQuestion}/:questionId`}
              element={<SpotsQuesetionEdit />}
            />
          </Route>

          <Route path={ROUTES.interiorQuestionTable}>
            <Route index element={<InteriersPage />} />
            <Route
              path={ROUTES.createInteriorQuestion}
              element={<InteriorQuestionCreate />}
            />
            <Route
              path={`${ROUTES.editInteriorQuestion}/:questionId`}
              element={<InteriorQuestionEdit />}
            />
          </Route>
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
