// app/page.tsx
import { redirect } from 'next/navigation'

// This server component will immediately redirect to /dashboard
export default function HomePage() {
  redirect('/dashboard')
}
