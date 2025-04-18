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
    <nav className="w-64 bg-white border-r">
      <div className="p-4 text-2xl font-bold text-blue-600">RecruitmentPlus</div>
      <ul>
        {navItems.map(({ label, href, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className={`flex items-center px-4 py-3 hover:bg-gray-100 ${
                path === href ? 'bg-gray-200 font-medium' : 'text-gray-700'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
