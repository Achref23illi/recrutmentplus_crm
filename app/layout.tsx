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
      <body className="flex h-screen bg-slate-50">
        {/* Sidebar */}
        <Sidebar />

        {/* Main area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top header */}
          <Header />

          {/* Page content */}
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto px-6 py-8 max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}