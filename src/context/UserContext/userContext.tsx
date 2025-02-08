import { getAuthParams } from '@utils'
import React, { createContext, useContext, useMemo, useState } from 'react'

interface UserContextProps {
  email: string
  isAuthenticated: boolean
  setIsAuthenticated: (val: boolean) => void
}

const UserContext = createContext<UserContextProps | null>(null)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { email, isAuthorized } = getAuthParams().orDefault({
    email: '',
    isAuthorized: false,
  })

  const [isAuthenticated, setIsAuthenticated] = useState(() => isAuthorized)

  const value = useMemo(() => {
    return {
      email,
      isAuthenticated,
      setIsAuthenticated,
    }
  }, [email, isAuthenticated, setIsAuthenticated])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within a UserProvider')

  return context
}
