import CircularProgress from '@mui/material/CircularProgress'
import { useEffect, useState } from 'react'
import { VStack } from './Stack'

const SIZE = {
  xs: 20,
  sm: 24,
  md: 40,
}

export type LoadingProps = {
  show?: boolean
  delay?: number
  size?: keyof typeof SIZE
}

const Loading: React.FC<LoadingProps> = ({
  delay = 0,
  show = true,
  size = 'md',
}) => {
  const [showLoading, setShowLoading] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (!show) return setShowLoading(false)
    if (delay === 0) {
      setShowLoading(true)
    } else {
      timeout = setTimeout(() => setShowLoading(true), delay)
    }
    return () => clearTimeout(timeout)
  }, [show, delay])

  return showLoading ? (
    <VStack>
      <CircularProgress size={SIZE[size]} />
    </VStack>
  ) : null
}

export default Loading
