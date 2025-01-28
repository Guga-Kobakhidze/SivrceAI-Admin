import { lazy } from 'react'

const Interior = lazy(() => import('@features/interiors'))

const InteriorPage = () => {
  return <Interior />
}

export default InteriorPage
