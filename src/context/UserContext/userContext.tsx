import React, { createContext, useContext, useMemo, useState } from 'react'

interface UserContextProps {
  isAuthenticated: boolean
  setIsAuthenticated: (val: boolean) => void
}

const UserContext = createContext<UserContextProps | null>(null)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const value = useMemo(() => {
    return {
      isAuthenticated,
      setIsAuthenticated,
    }
  }, [isAuthenticated, setIsAuthenticated])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within a UserProvider')

  return context
}
