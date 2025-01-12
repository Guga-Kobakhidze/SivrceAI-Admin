import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import SpotCreate from './features/spots/SpotsCreate'

const SpostsPage = lazy(() => import('./pages/SpotsPage'))
const UsersPage = lazy(() => import('./pages/UsersPage'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))

const Router = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<UsersPage />} />
        <Route path="/spots">
          <Route index element={<SpostsPage />} />
          <Route path="/spots/create" element={<SpotCreate />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default Router
