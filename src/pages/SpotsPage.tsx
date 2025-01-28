import { lazy } from 'react'

const Spots = lazy(() => import('@features/spots'))

const SpostsPage = () => {
  return <Spots />
}

export default SpostsPage
