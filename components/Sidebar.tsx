// components/Sidebar.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Building,
  CalendarDays,
  BarChartBig,
  Sparkles,
  Bot,
  UsersRound,
  Settings,
  ChevronRight,
  LogOut
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'Candidates', href: '/candidates', icon: <Users size={20} /> },
  { label: 'Companies', href: '/companies', icon: <Building size={20} /> },
  { label: 'Calendar', href: '/calendar', icon: <CalendarDays size={20} /> },
  { label: 'Analytics', href: '/analytics', icon: <BarChartBig size={20} /> },
  { label: 'Automation', href: '/automation', icon: <Sparkles size={20} /> },
  { label: 'AI Assistant', href: '/ai-assistant', icon: <Bot size={20} /> },
  { label: 'Team', href: '/team', icon: <UsersRound size={20} /> },
  { label: 'Settings', href: '/settings', icon: <Settings size={20} /> },
]

export default function Sidebar() {
  const pathname = usePathname()
  
  return (
    <aside className="w-72 bg-[#0F1A1E] text-white shadow-xl h-full flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6">
        <div className="relative h-16 w-full">
          <Image
            src="/logo.webp"
            alt="RecruitmentPlus Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Divider */}
      <div className="px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#2a6274]/30 to-transparent"></div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ label, href, icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-gradient-to-r from-[#1D4E5F]/90 to-[#123040] text-white font-medium' 
                  : 'text-[#C0D0D5] hover:bg-[#1A2E36]/70'
              }`}
            >
              <span className={`${isActive ? 'text-[#80BDCA]' : 'text-[#9AB3BB] group-hover:text-[#C0D0D5]'}`}>
                {icon}
              </span>
              <span className="ml-3">{label}</span>
              {isActive && (
                <div className="ml-auto">
                  <ChevronRight size={16} className="text-[#80BDCA]" />
                </div>
              )}
            </Link>
          )
        })}
      </nav>
      
      {/* Divider */}
      <div className="px-6 mb-3">
        <div className="h-px bg-gradient-to-r from-transparent via-[#2a6274]/30 to-transparent"></div>
      </div>
      
      {/* User profile */}
      <div className="px-4 py-4 mx-3 mb-3 rounded-lg bg-gradient-to-b from-[#123040] to-[#0B1B21] border border-[#2a6274]/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-9 w-9 rounded-full bg-[#1D4E5F] flex items-center justify-center text-[#80BDCA] font-medium shadow-inner shadow-black/20">
              JP
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">John Peterson</p>
              <p className="text-xs text-[#9AB3BB]">Senior Recruiter</p>
            </div>
          </div>
          <button className="h-8 w-8 rounded-full flex items-center justify-center text-[#9AB3BB] hover:bg-[#1D4E5F]/30 hover:text-[#80BDCA] transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  )
}