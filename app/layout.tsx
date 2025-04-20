// app/layout.tsx
import './globals.css'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { Inter } from 'next/font/google'

// Load Inter font properly
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'RecruitmentPlus CRM',
  description: 'Advanced recruitment management platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="flex h-screen bg-[#121212] overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Header component */}
            <div className="container mx-auto px-6 max-w-7xl">
              <Header />
            </div>

            {/* Page content - scrollable area */}
            <div className="flex-1 overflow-auto">
              <div className="container mx-auto px-6 py-6 max-w-7xl">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}