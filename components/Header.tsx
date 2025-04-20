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
    <header className="bg-transparent py-5 border-b border-neutral-700/50 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Left side: page title + search */}
        <div className="flex items-center space-x-6 lg:space-x-10">
          {/* Mobile menu button - only visible on small screens */}
          <button 
            className="lg:hidden text-neutral-400 hover:text-white"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Page title */}
          <h1 className="text-xl font-semibold text-white hidden sm:block">
            {getPageTitle()}
          </h1>
        </div>

        {/* Right side: search + notifications + user avatar/menu */}
        <div className="flex items-center space-x-5">
          {/* Search */}
          <div className="relative hidden lg:block">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-60 border border-neutral-700 bg-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F] focus:border-transparent"
            />
          </div>
          
          {/* Search button - visible only on smaller screens */}
          <button className="lg:hidden text-neutral-400 hover:text-white" title="Search">
            <Search size={20} />
          </button>
          
          {/* Notifications */}
          <div className="relative">
            <button className="relative p-1.5 rounded-full hover:bg-neutral-800 transition-colors">
              <Bell size={20} className="text-neutral-400" />
              {/* Notification badge */}
              <span className="absolute top-0 right-0 h-4 w-4 bg-[#37A794] rounded-full text-[10px] font-medium flex items-center justify-center text-white">3</span>
            </button>
          </div>
          
          {/* User avatar - dropdown trigger */}
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)} 
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="h-8 w-8 rounded-full bg-[#1D4E5F] text-white flex items-center justify-center text-sm font-medium relative ring-2 ring-neutral-700">
                JP
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-[#37A794] rounded-full border-2 border-[#121212]"></span>
              </div>
              <span className="hidden md:inline text-sm font-medium text-white">John Peterson</span>
            </button>
            
            {/* Dropdown menu */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-neutral-800 rounded-lg shadow-lg border border-neutral-700 py-1 z-50">
                <div className="px-4 py-3 border-b border-neutral-700">
                  <p className="text-sm font-medium text-white">John Peterson</p>
                  <p className="text-xs text-neutral-400">john.peterson@example.com</p>
                </div>
                <Link href="/settings/profile" className="flex items-center px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700">
                  <User size={16} className="mr-3 text-neutral-400" />
                  Your Profile
                </Link>
                <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700">
                  <Settings size={16} className="mr-3 text-neutral-400" />
                  Settings
                </Link>
                <div className="border-t border-neutral-700 my-1"></div>
                <button className="flex w-full items-center px-4 py-2 text-sm text-red-400 hover:bg-neutral-700">
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
        <div className="px-4 py-3 border-t border-neutral-700 lg:hidden mt-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 border border-neutral-700 bg-neutral-800 rounded-lg text-sm text-white"
            />
          </div>
        </div>
      )}
    </header>
  )
}