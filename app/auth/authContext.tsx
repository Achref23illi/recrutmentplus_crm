'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = () => {
      // In a real app, you would check for a valid token in localStorage or cookies
      // For demo purposes, we'll just check localStorage
      const isLoggedIn = localStorage.getItem('isAuthenticated') === 'true'
      setIsAuthenticated(isLoggedIn)
      setIsLoading(false)

      // If not authenticated and not on login page, redirect to login
      if (!isLoggedIn && !pathname?.includes('/auth/login')) {
        router.push('/auth/login')
      }
    }

    checkAuth()
  }, [pathname, router])

  // Simple login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // This is a mock login - in a real app you would validate credentials with an API
    if (email && password) {
      // Store authentication state in localStorage for persistence
      localStorage.setItem('isAuthenticated', 'true')
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('isAuthenticated')
    setIsAuthenticated(false)
    router.push('/auth/login')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}