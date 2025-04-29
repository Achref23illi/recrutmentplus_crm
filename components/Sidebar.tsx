'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, Variants } from 'framer-motion'
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
import { useState } from 'react'

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
  const [isHovering, setIsHovering] = useState<string | null>(null)
  
  // Animation variants
  const sidebarVariants: Variants = {
    hidden: { x: -300, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        damping: 25, 
        stiffness: 120,
        when: 'beforeChildren',
        staggerChildren: 0.05
      }
    }
  }
  
  const logoVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }
  
  const navItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: 'spring',
        damping: 15,
        stiffness: 100
      }
    }
  }
  
  const activeIndicatorVariants: Variants = {
    initial: { 
      opacity: 0,
      scale: 0.5,
    },
    animate: { 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: 'easeOut' 
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.5,
      transition: { 
        duration: 0.2,
        ease: 'easeIn'
      }
    }
  }
  

  const profileHoverVariants: Variants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.02,
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      transition: { 
        duration: 0.3,
        ease: 'easeOut' 
      } 
    }
  }

  // Divider animation
  const dividerVariants: Variants = {
    hidden: { opacity: 0, width: '0%' },
    visible: { 
      opacity: 1, 
      width: '100%',
      transition: { 
        duration: 0.7,
        ease: 'easeOut',
        delay: 0.2
      }
    }
  }
  
  const avatarVariants: Variants = {
    rest: { scale: 1 },
    hover: { scale: 1.1, rotate: 5, transition: { type: 'spring', stiffness: 300, damping: 10 } },
    tap: { scale: 0.9, rotate: -5, transition: { duration: 0.2 } }
  }
  
  return (
    <motion.aside 
      className="w-72 bg-[#0F1A1E] text-white shadow-xl h-full flex flex-col"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    >
      {/* Logo */}
      <motion.div 
        className="px-6 py-6"
        variants={logoVariants}
        whileHover={{ scale: 1.03 }}
      >
        <div className="relative h-16 w-full">
          <Image
            src="/logo.webp"
            alt="RecruitmentPlus Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </motion.div>

      {/* Divider */}
      <div className="px-6 overflow-hidden">
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-[#2a6274]/30 to-transparent"
          variants={dividerVariants}
        ></motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ label, href, icon }, index) => {
          const isActive = pathname === href
          const isHovered = isHovering === href
          
          return (
            <motion.div
              key={label}
              variants={navItemVariants}
              custom={index}
              onHoverStart={() => setIsHovering(href)}
              onHoverEnd={() => setIsHovering(null)}
              whileHover={{ 
                x: 2, 
                transition: { duration: 0.2 } 
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={href}
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#1D4E5F]/90 to-[#123040] text-white font-medium' 
                    : 'text-[#C0D0D5] hover:bg-[#1A2E36]/70'
                }`}
              >
                <motion.span 
                  className={`${isActive ? 'text-[#80BDCA]' : 'text-[#9AB3BB] group-hover:text-[#C0D0D5]'}`}
                  animate={isHovered || isActive ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  {icon}
                </motion.span>
                <span className="ml-3">{label}</span>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      className="ml-auto"
                      variants={activeIndicatorVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <ChevronRight size={16} className="text-[#80BDCA]" />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#80BDCA]/5 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0.2, 0.3, 0.2],
                      transition: { 
                        duration: 2, 
                        repeat: Infinity,
                        repeatType: 'reverse'
                      }
                    }}
                    style={{ pointerEvents: 'none' }}
                  />
                )}
              </Link>
            </motion.div>
          )
        })}
      </nav>
      
      {/* Divider */}
      <div className="px-6 mb-3 overflow-hidden">
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-[#2a6274]/30 to-transparent"
          variants={dividerVariants}
        ></motion.div>
      </div>
      
      {/* User profile */}
      <motion.div 
        className="px-4 py-4 mx-3 mb-3 rounded-lg bg-gradient-to-b from-[#123040] to-[#0B1B21] border border-[#2a6274]/20"
        variants={profileHoverVariants}
        initial="rest"
        whileHover="hover"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <motion.div 
              className="h-9 w-9 rounded-full bg-[#1D4E5F] flex items-center justify-center text-[#80BDCA] font-medium shadow-inner shadow-black/20"
              variants={avatarVariants}
              whileHover="hover"
              whileTap="tap"
            >
              JP
            </motion.div>
            <div className="ml-3">
              <motion.p 
                className="text-sm font-medium text-white"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                John Peterson
              </motion.p>
              <motion.p 
                className="text-xs text-[#9AB3BB]"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Senior Recruiter
              </motion.p>
            </div>
          </div>
          <motion.button 
            className="h-8 w-8 rounded-full flex items-center justify-center text-[#9AB3BB] hover:bg-[#1D4E5F]/30 hover:text-[#80BDCA] transition-colors"
            whileHover={{ 
              scale: 1.15, 
              rotate: 10, 
              backgroundColor: 'rgba(29, 78, 95, 0.4)'
            }}
            whileTap={{ scale: 0.9, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <LogOut size={16} />
          </motion.button>
        </div>
      </motion.div>
    </motion.aside>
  )
}