// components/Header.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { Bell, Search, Menu, X, User, LogOut, Settings, Calendar, Mail, CheckCircle2, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const pathname = usePathname()
  
  const userMenuRef = useRef<HTMLDivElement>(null)
  const notificationMenuRef = useRef<HTMLDivElement>(null)
  
  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
      if (notificationMenuRef.current && !notificationMenuRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  // Get current page title from pathname
  const getPageTitle = () => {
    const path = pathname.split('/')[1]
    if (!path) return 'Dashboard'
    return path.charAt(0).toUpperCase() + path.slice(1)
  }

  // Sample notifications data
  const notifications = [
    {
      id: '1',
      title: 'Interview Scheduled',
      message: 'Emma Thompson interview set for tomorrow at 10:00 AM',
      time: '10 min ago',
      type: 'calendar'
    },
    {
      id: '2',
      title: 'New Application',
      message: 'David Kim applied for Senior Developer position',
      time: '2 hours ago',
      type: 'application'
    },
    {
      id: '3',
      title: 'Task Completed',
      message: 'Sarah updated candidate profile review task',
      time: '1 day ago',
      type: 'task'
    }
  ]

  return (
    <header className="bg-[#0F1A1E]/90 backdrop-blur-sm py-4 border-b border-[#2a6274]/30 sticky top-0 z-30 shadow-md">
      <div className="flex items-center justify-between px-6 max-w-7xl mx-auto">
        {/* Left side: page title + search */}
        <div className="flex items-center space-x-6 lg:space-x-10">
          {/* Mobile menu button - only visible on small screens */}
          <button 
            className="lg:hidden text-neutral-400 hover:text-[#80BDCA] p-1.5 rounded-lg hover:bg-[#1A2E36]/70"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Page title */}
          <h1 className="text-xl font-semibold text-[#80BDCA] hidden sm:flex sm:items-center sm:gap-2">
            {getPageTitle()}
            <span className="text-xs bg-[#1D4E5F]/50 text-[#9AB3BB] py-1 px-2 rounded-md font-normal ml-2">
              April 21, 2025
            </span>
          </h1>
        </div>

        {/* Right side: search + notifications + user avatar/menu */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden lg:block">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AB3BB]" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 border border-[#2a6274]/50 bg-[#123040]/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F] focus:border-transparent transition-all"
            />
          </div>
          
          {/* Search button - visible only on smaller screens */}
          <button className="lg:hidden p-2 rounded-lg text-[#9AB3BB] hover:text-[#80BDCA] hover:bg-[#1A2E36]/70" title="Search">
            <Search size={20} />
          </button>
          
          {/* Notifications */}
          <div className="relative" ref={notificationMenuRef}>
            <button 
              className="relative p-2 rounded-lg hover:bg-[#1A2E36]/70 transition-colors"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
            >
              <Bell size={20} className={`${showNotifications ? 'text-[#80BDCA]' : 'text-[#9AB3BB]'}`} />
              {/* Notification badge */}
              <span className="absolute top-1 right-1 h-4 w-4 bg-[#37A794] rounded-full text-[10px] font-medium flex items-center justify-center text-white">3</span>
            </button>
            
            {/* Notification dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-1.5 w-80 bg-[#0F1A1E] rounded-lg shadow-xl border border-[#2a6274]/30 overflow-hidden z-50">
                <div className="px-4 py-3 bg-[#123040]/70 border-b border-[#2a6274]/30 flex justify-between items-center">
                  <h3 className="font-medium text-white">Notifications</h3>
                  <Link href="/notifications" className="text-xs text-[#80BDCA] hover:text-[#51B3A2]">
                    View All
                  </Link>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id}
                      className="px-4 py-3 border-b border-[#2a6274]/20 hover:bg-[#1A2E36]/40 transition-colors"
                    >
                      <div className="flex">
                        <div className="mr-3">
                          <div className={`h-9 w-9 rounded-full flex items-center justify-center shadow-inner shadow-black/20
                            ${notification.type === 'calendar' ? 'bg-blue-900/30 text-blue-300' : 
                              notification.type === 'application' ? 'bg-[#1D4E5F]/40 text-[#80BDCA]' : 
                              'bg-green-900/30 text-green-300'}`}
                          >
                            {notification.type === 'calendar' ? <Calendar size={18} /> : 
                             notification.type === 'application' ? <Mail size={18} /> : 
                             <CheckCircle2 size={18} />}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{notification.title}</p>
                          <p className="text-xs text-[#9AB3BB] mt-0.5">{notification.message}</p>
                          <p className="text-xs text-[#5D7379] mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="px-4 py-2 bg-[#123040]/50 border-t border-[#2a6274]/30">
                  <button className="w-full py-2 text-center text-sm text-[#80BDCA] hover:text-[#51B3A2] transition-colors">
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* User avatar - dropdown trigger */}
          <div className="relative" ref={userMenuRef}>
            <button 
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }} 
              className="flex items-center space-x-2 focus:outline-none py-1.5 px-2 rounded-lg hover:bg-[#1A2E36]/70 transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-[#1D4E5F] text-white flex items-center justify-center text-sm font-medium shadow-inner shadow-black/20">
                JP
                <span className="absolute bottom-0 right-0.5 h-3 w-3 bg-[#37A794] rounded-full border-2 border-[#0F1A1E]"></span>
              </div>
              <span className="hidden md:inline text-sm font-medium text-white">John Peterson</span>
              <ChevronDown size={16} className="hidden md:block text-[#9AB3BB]" />
            </button>
            
            {/* Dropdown menu */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-1.5 w-60 bg-[#0F1A1E] rounded-lg shadow-xl border border-[#2a6274]/30 py-1 z-50">
                <div className="px-4 py-3 border-b border-[#2a6274]/30">
                  <p className="text-sm font-medium text-white">John Peterson</p>
                  <p className="text-xs text-[#9AB3BB]">john.peterson@example.com</p>
                </div>
                <Link href="/settings/profile" className="flex items-center px-4 py-2.5 text-sm text-[#C0D0D5] hover:bg-[#1A2E36]/70">
                  <User size={16} className="mr-3 text-[#9AB3BB]" />
                  Your Profile
                </Link>
                <Link href="/settings" className="flex items-center px-4 py-2.5 text-sm text-[#C0D0D5] hover:bg-[#1A2E36]/70">
                  <Settings size={16} className="mr-3 text-[#9AB3BB]" />
                  Settings
                </Link>
                <div className="border-t border-[#2a6274]/30 my-1"></div>
                <button className="flex w-full items-center px-4 py-2.5 text-sm text-red-400 hover:bg-[#1A2E36]/70">
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
        <div className="px-6 py-3 border-t border-[#2a6274]/30 lg:hidden mt-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AB3BB]" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 border border-[#2a6274]/50 bg-[#123040]/50 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#1D4E5F]"
            />
          </div>
        </div>
      )}
    </header>
  )
}