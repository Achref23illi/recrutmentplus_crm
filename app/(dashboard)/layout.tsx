'use client'

import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { useAuth } from '../auth/authContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, isLoading, router])
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-t-[#80BDCA] border-neutral-700 rounded-full mx-auto mb-4"></div>
          <p className="text-neutral-400">Loading...</p>
        </div>
      </div>
    )
  }
  
  // If authenticated, render the dashboard layout
  if (isAuthenticated) {
    return (
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Header component */}
          <Header />

          {/* Page content - scrollable area */}
          <div className="flex-1 overflow-auto">
            <div className="container mx-auto px-6 py-6 max-w-7xl">
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // Fallback while redirecting - should not be rendered for long
  return null
}