// app/page.tsx
import { redirect } from 'next/navigation'

// This server component will immediately redirect to login page
export default function HomePage() {
  redirect('/auth/login')
}
