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
} from 'lucide-react'
import Image from 'next/image'

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
    <aside className="w-72 bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-xl h-full flex flex-col">
      {/* Logo / Brand */}
      <div className="px-6 py-8 border-b border-blue-500/30">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-lg p-1.5">
            <Image 
              src="/next.svg" 
              alt="RecruitmentPlus Logo" 
              width={30} 
              height={30}
              className="h-6 w-6" 
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">RecruitmentPlus</h1>
            <p className="text-xs text-blue-200">Talent Acquisition Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map(({ label, href, icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-white/10 text-white font-medium' 
                  : 'text-blue-100 hover:bg-white/5'
              }`}
            >
              <span className={`${isActive ? 'text-white' : 'text-blue-200 group-hover:text-blue-100'}`}>
                {icon}
              </span>
              <span className="ml-3">{label}</span>
              {isActive && <div className="ml-auto w-1.5 h-5 bg-white rounded-full"></div>}
            </Link>
          )
        })}
      </nav>
      
      {/* User profile snippet */}
      <div className="px-4 py-4 border-t border-blue-500/30 m-3 rounded-lg bg-blue-700/50">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-medium">
            JP
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">John Peterson</p>
            <p className="text-xs text-blue-200">Senior Recruiter</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
