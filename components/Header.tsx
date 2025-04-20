// components/Header.tsx
'use client'

import { useState } from 'react'
import { Bell, Search, Menu, X, User, LogOut, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const pathname = usePathname()
  
  // Get current page title from pathname
  const getPageTitle = () => {
    const path = pathname.split('/')[1]
    if (!path) return 'Dashboard'
    return path.charAt(0).toUpperCase() + path.slice(1)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-6 h-16 flex items-center justify-between">
        {/* Left side: page title + search */}
        <div className="flex items-center space-x-6 lg:space-x-10">
          {/* Mobile menu button - only visible on small screens */}
          <button 
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Page title */}
          <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">
            {getPageTitle()}
          </h1>

          {/* Search input */}
          <div className="relative hidden lg:block">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search candidates, companies, jobs..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50"
            />
          </div>
        </div>

        {/* Right side: quick actions + notifications + user avatar/menu */}
        <div className="flex items-center space-x-5">
          {/* Search button - visible only on smaller screens */}
          <button className="lg:hidden text-gray-500 hover:text-gray-700" title="Search">
            <Search size={20} />
          </button>
          
          {/* Notifications */}
          <div className="relative">
            <button className="relative p-1.5 rounded-full hover:bg-gray-100 transition-colors">
              <Bell size={20} className="text-gray-600" />
              {/* Notification badge */}
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] font-medium flex items-center justify-center text-white">3</span>
            </button>
          </div>
          
          {/* User avatar - dropdown trigger */}
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)} 
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium relative ring-2 ring-white">
                JP
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white"></span>
              </div>
              <span className="hidden md:inline text-sm font-medium text-gray-700">John Peterson</span>
            </button>
            
            {/* Dropdown menu */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">John Peterson</p>
                  <p className="text-xs text-gray-500">john.peterson@example.com</p>
                </div>
                <Link href="/settings/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <User size={16} className="mr-3 text-gray-500" />
                  Your Profile
                </Link>
                <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Settings size={16} className="mr-3 text-gray-500" />
                  Settings
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <button className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                  <LogOut size={16} className="mr-3" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile search - visible when menu is open */}
      {showMobileMenu && (
        <div className="px-4 py-3 border-t border-gray-200 lg:hidden">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      )}
    </header>
  )
}
