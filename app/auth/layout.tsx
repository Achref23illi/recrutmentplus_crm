'use client'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen items-center justify-center">
      {children}
    </div>
  )
}