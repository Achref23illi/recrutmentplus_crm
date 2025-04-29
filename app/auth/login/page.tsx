'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { LogIn } from 'lucide-react'
import { useAuth } from '../authContext'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Handle login with our authentication context
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Form validation
    if (!email || !password) {
      setError('Please enter both email and password')
      setLoading(false)
      return
    }

    try {
      // Call login from auth context
      const success = await login(email, password)
      
      if (success) {
        // Redirect to dashboard on successful login
        router.push('/dashboard')
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('An error occurred during sign in')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="w-full max-w-md p-8 space-y-8 bg-neutral-800 border border-neutral-700 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <motion.div
        className="flex justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="relative h-16 w-48">
          <Image
            src="/logo.webp"
            alt="RecruitmentPlus Logo"
            fill
            className="object-contain"
            priority />
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-[#80BDCA]">Admin Login</h2>
        <p className="mt-2 text-sm text-neutral-400">Sign in to access the admin dashboard</p>
      </motion.div>

      {/* Form */}
      <motion.form
        className="mt-8 space-y-6"
        onSubmit={handleLogin}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {error && (
          <motion.div
            className="p-3 bg-red-900/20 border border-red-800 rounded-lg"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <p className="text-sm text-red-400">{error}</p>
          </motion.div>
        )}

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
          <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
            placeholder="admin@example.com" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
            placeholder="••••••••" />
        </motion.div>
      </div>

      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.3 }}
      >
        <div className="flex items-center">
          <input
            id="remember_me"
            name="remember_me"
            type="checkbox"
            className="h-4 w-4 bg-neutral-900 border-neutral-700 rounded focus:ring-[#1D4E5F] focus:outline-none" />
          <label htmlFor="remember_me" className="ml-2 block text-sm text-neutral-400">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <button type="button" className="text-[#80BDCA] hover:text-[#51B3A2] focus:outline-none">
            Forgot password?
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.3 }}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
      >
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center px-4 py-2 rounded-lg transition ${loading ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed' : 'bg-[#1D4E5F] text-white hover:bg-[#123040]'}`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </>
          ) : (
            <>
              <LogIn className="mr-2" size={20} />
              Sign in
            </>
          )}
        </button>
      </motion.div>
    </motion.form><motion.div
      className="mt-6 text-center text-xs text-neutral-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.4 }}
    >
        <p>© {new Date().getFullYear()} RecruitmentPlus. All rights reserved.</p>
      </motion.div>
    </motion.div>
  )
}