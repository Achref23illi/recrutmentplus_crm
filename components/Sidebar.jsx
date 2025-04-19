// components/Sidebar.jsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  UserIcon,
  Building2Icon,
  CalendarIcon,
  BarChartIcon,
  ZapIcon,
  MessageSquareIcon,
  UsersIcon,
  SettingsIcon,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard',    href: '/',           icon: HomeIcon },
  { label: 'Candidates',   href: '/candidates', icon: UserIcon },
  { label: 'Companies',    href: '/companies',  icon: Building2Icon },
  { label: 'Calendar',     href: '/calendar',   icon: CalendarIcon },
  { label: 'Analytics',    href: '/analytics',  icon: BarChartIcon },
  { label: 'Automation',   href: '/automation', icon: ZapIcon },
  { label: 'AI Assistant', href: '/ai-assistant', icon: MessageSquareIcon },
  { label: 'Team',         href: '/team',       icon: UsersIcon },
  { label: 'Settings',     href: '/settings',   icon: SettingsIcon },
]

export default function Sidebar() {
  const path = usePathname() || '/'
  return (
    <nav className="w-64 bg-[var(--card)] border-r border-[var(--border)] shadow-soft flex flex-col">
      <div className="p-6">
        <div className="text-2xl font-bold gradient-primary text-[var(--primary-foreground)] px-4 py-2 rounded-lg flex items-center justify-center">
          RecruitmentPlus
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="space-y-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = path === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-medium shadow-soft' 
                      : 'text-[var(--foreground)] hover:bg-[var(--secondary)] hover:text-[var(--primary)]'
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-[var(--primary-foreground)]' : ''}`} />
                  <span>{label}</span>
                  {isActive && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-[var(--accent)]"></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      
      <div className="p-4 border-t border-[var(--border)]">
        <div className="text-xs text-[var(--muted-foreground)] text-center">
          RecruitmentPlus CRM v1.0
        </div>
      </div>
    </nav>
  )
}
