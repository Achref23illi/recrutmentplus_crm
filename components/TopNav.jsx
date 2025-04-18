// components/TopNav.jsx
'use client'

import { Bell, MessageCircle, ChevronDown } from 'lucide-react'

export default function TopNav() {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <input
        type="text"
        placeholder="Search candidates, companies, or tasks..."
        className="w-full max-w-md px-3 py-2 border rounded-md focus:outline-none focus:ring"
      />

      <div className="flex items-center space-x-4">
        <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
        <MessageCircle className="h-6 w-6 text-gray-600 cursor-pointer" />
        <div className="flex items-center space-x-2 cursor-pointer">
          <img
            src="/avatar.jpg"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium text-gray-700">Sarah Johnson</span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </header>
  )
}
