// app/layout.js
import './globals.css'
import Sidebar from '../components/Sidebar'
import TopNav   from '../components/TopNav'

export const metadata = {
  title: 'RecrutementPlus CRM',
  description: 'Your recruitment management system',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-100">
        <Sidebar />

        <div className="flex flex-col flex-1 overflow-hidden">
          <TopNav />
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  )
}
