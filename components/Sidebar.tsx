// components/Sidebar.tsx
'use client'

import Link from 'next/link'
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
  ChevronRight
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
    <aside className="w-72 bg-[#1D4E5F] text-white shadow-xl h-full flex flex-col">
      {/* Logo / Brand */}
      <div className="px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-lg p-1.5">
            <span className="text-[#1D4E5F] font-bold text-xs">NEXT</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">RecruitmentPlus</h1>
            <p className="text-xs text-[#9AB3BB]">Talent Acquisition Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ label, href, icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-white/10 text-white font-medium' 
                  : 'text-[#C0D0D5] hover:bg-white/5'
              }`}
            >
              <span className={`${isActive ? 'text-white' : 'text-[#9AB3BB] group-hover:text-[#C0D0D5]'}`}>
                {icon}
              </span>
              <span className="ml-3">{label}</span>
              {isActive && (
                <div className="ml-auto">
                  <ChevronRight size={16} className="text-[#9AB3BB]" />
                </div>
              )}
            </Link>
          )
        })}
      </nav>
      
      {/* User profile snippet */}
      <div className="px-3 py-3 mx-3 mb-3 rounded-lg bg-[#123040]/40 border border-[#2a6274]/20">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-red-400 flex items-center justify-center text-[#1D4E5F] font-medium">
            JP
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">John Peterson</p>
            <p className="text-xs text-[#9AB3BB]">Senior Recruiter</p>
          </div>
        </div>
      </div>
    </aside>
  )
}