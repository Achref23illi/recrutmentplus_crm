'use client'

import './globals.css'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { Inter } from 'next/font/google'
import { AuthProvider } from './auth/authContext'
import { usePathname } from 'next/navigation'
import { OfficeProvider } from '@/contexts/OfficeContext';
import { OfficeSelector } from '@/components/OfficeSelector';

// Load Inter font properly
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Metadata now needs to be in a separate file since this is a client component

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname?.startsWith('/auth');

  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className={`bg-[#121212] h-screen overflow-hidden ${!isAuthRoute ? 'flex' : ''}`}>
        <AuthProvider>
          <OfficeProvider>
            {/* Show Sidebar and Header only for non-auth routes */}
            {!isAuthRoute ? (
              <>
                {/* Sidebar */}
                <Sidebar />

                {/* Main area */}
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                  <div className="flex-1 flex flex-col h-full overflow-hidden">
                    {/* Header component */}
                    <Header />
                    <header className="h-16 border-b border-neutral-800 bg-neutral-900 flex items-center justify-between px-6">
                      {/* Left side - can contain breadcrumbs or page title */}
                      <div>
                        {/* ...existing header left side... */}
                      </div>
                      
                      {/* Right side - profile, notifications, etc */}
                      <div className="flex items-center space-x-4">
                        <OfficeSelector />
                        {/* ...existing header right side... */}
                      </div>
                    </header>

                    {/* Page content - scrollable area */}
                    <div className="flex-1 overflow-auto">
                      <div className="container mx-auto px-6 py-6 max-w-7xl">
                        {children}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* For auth routes, just show the children centered on the page */
              <div className="flex h-screen items-center justify-center">
                {children}
              </div>
            )}
          </OfficeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}