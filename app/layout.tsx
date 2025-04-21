'use client'

import './globals.css'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { Inter } from 'next/font/google'
import { AuthProvider } from './auth/authContext'
import { usePathname } from 'next/navigation'

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
        </AuthProvider>
      </body>
    </html>
  )
}