// app/settings/page.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { 
  User, 
  Building, 
  Bell, 
  Globe, 
  Lock, 
  Mail,
  Power,
  Check,
  ChevronRight, 
  Palette,
  Shield,
  Calendar
} from 'lucide-react'

// Settings navigation sections
const settingsSections = [
  { id: 'profile', name: 'Profile', icon: <User size={18} /> },
  { id: 'company', name: 'Company', icon: <Building size={18} /> },
  { id: 'notifications', name: 'Notifications', icon: <Bell size={18} /> },
  { id: 'integrations', name: 'Integrations', icon: <Globe size={18} /> },
  { id: 'security', name: 'Security', icon: <Shield size={18} /> },
  { id: 'appearance', name: 'Appearance', icon: <Palette size={18} /> },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')
  const [formState, setFormState] = useState({
    // Profile settings
    name: 'John Peterson',
    email: 'john.peterson@example.com',
    phone: '+1 (555) 123-4567',
    role: 'Senior Recruiter',
    
    // Company settings
    companyName: 'RecruitmentPlus',
    timeZone: 'Africa/Algiers',
    
    // Notification settings
    emailNotif: true,
    pushNotif: false,
    weeklyReports: true,
    candidateUpdates: true,
    teamNotifications: true,
    
    // Appearance settings
    theme: 'dark',
    compactMode: false,
    
    // Integration settings
    integrateEmail: true,
    integrateCalendar: true,
    integrateSlack: false,
    integrateLinkedIn: true,
    
    // Security settings
    twoFactorEnabled: false,
    sessionTimeout: '1 hour',
    passwordLastChanged: '2 months ago',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  }

  // Button hover animation
  const buttonVariants = {
    hover: { 
      scale: 1.03, 
      backgroundColor: '#123040',
      transition: { duration: 0.2 } 
    },
    tap: { scale: 0.98 }
  }

  // Sidebar item variants
  const sidebarItemVariants = {
    hover: { x: 5, transition: { duration: 0.2 } },
    tap: { scale: 0.98 }
  }

  // Toggle switch animation
  const toggleVariants = {
    checked: { x: 20 },
    unchecked: { x: 0 }
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <motion.div
            key="profile"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Card className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 shadow-lg">
              <div className="p-6">
                <motion.h3 
                  className="text-lg font-medium text-white mb-5 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <User size={18} className="text-[#80BDCA] mr-2" /> Profile Settings
                </motion.h3>
                
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    {/* Avatar Section */}
                    <motion.div 
                      className="flex flex-col items-center sm:items-start space-y-3"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.div 
                        className="h-24 w-24 rounded-xl bg-[#1D4E5F]/30 flex items-center justify-center text-[#80BDCA] font-semibold text-2xl"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(128, 189, 202, 0.3)" }}
                      >
                        JP
                      </motion.div>
                      <motion.button 
                        className="px-3 py-1.5 bg-neutral-700 text-neutral-300 text-sm rounded-lg hover:bg-neutral-600 transition"
                        whileHover={buttonVariants.hover}
                        whileTap={buttonVariants.tap}
                      >
                        Change Avatar
                      </motion.button>
                    </motion.div>
                    
                    {/* Main Profile Form */}
                    <motion.div 
                      className="flex-1 space-y-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-1">Name</label>
                        <motion.input
                          whileFocus={{ boxShadow: "0 0 0 2px rgba(29, 78, 95, 0.6)" }}
                          title="Enter your name"
                          placeholder="Enter your name"
                          type="text"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-300 mb-1">Email</label>
                          <motion.input
                            whileFocus={{ boxShadow: "0 0 0 2px rgba(29, 78, 95, 0.6)" }}
                            title="Enter your email"
                            placeholder="Enter your email"
                            type="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-300 mb-1">Phone</label>
                          <motion.input
                            whileFocus={{ boxShadow: "0 0 0 2px rgba(29, 78, 95, 0.6)" }}
                            title="Enter your phone number"
                            placeholder="Enter your phone number"
                            type="tel"
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                            className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-1">Role</label>
                        <motion.input
                          whileFocus={{ boxShadow: "0 0 0 2px rgba(29, 78, 95, 0.6)" }}
                          title="Enter your role"
                          placeholder="Enter your role"
                          type="text"
                          name="role"
                          value={formState.role}
                          onChange={handleChange}
                          className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                        />
                      </div>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="pt-4 flex justify-end"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.button 
                      className="px-4 py-2 bg-[#1D4E5F] text-white rounded-lg hover:bg-[#123040] transition"
                      whileHover={buttonVariants.hover}
                      whileTap={buttonVariants.tap}
                    >
                      Save Changes
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>
        )
      
      case 'company':
        return (
          <motion.div
            key="company"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Card className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 shadow-lg">
              <div className="p-6">
                <motion.h3 
                  className="text-lg font-medium text-white mb-5 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Building size={18} className="text-[#80BDCA] mr-2" /> Company Settings
                </motion.h3>
                
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">Company Name</label>
                    <motion.input
                      whileFocus={{ boxShadow: "0 0 0 2px rgba(29, 78, 95, 0.6)" }}
                      type="text"
                      name="companyName"
                      value={formState.companyName}
                      onChange={handleChange}
                      className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">Time Zone</label>
                    <motion.select
                      whileFocus={{ boxShadow: "0 0 0 2px rgba(29, 78, 95, 0.6)" }}
                      title="Select your time zone"
                      name="timeZone"
                      value={formState.timeZone}
                      onChange={handleChange}
                      className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                    >
                      <option value="Africa/Algiers">Africa/Algiers</option>
                      <option value="Europe/London">Europe/London</option>
                      <option value="America/New_York">America/New_York</option>
                      <option value="Asia/Dubai">Asia/Dubai</option>
                    </motion.select>
                  </div>
                  
                  <motion.div 
                    className="pt-4 flex justify-end"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.button 
                      className="px-4 py-2 bg-[#1D4E5F] text-white rounded-lg hover:bg-[#123040] transition"
                      whileHover={buttonVariants.hover}
                      whileTap={buttonVariants.tap}
                    >
                      Save Changes
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        )
        
      case 'notifications':
        return (
          <motion.div
            key="notifications"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Card className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 shadow-lg">
              <div className="p-6">
                <motion.h3 
                  className="text-lg font-medium text-white mb-5 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Bell size={18} className="text-[#80BDCA] mr-2" /> Notification Settings
                </motion.h3>
                
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="space-y-4">
                    <motion.div 
                      className="flex items-center justify-between p-3 rounded-lg border border-neutral-700 bg-neutral-800/50 hover:bg-neutral-700/30 transition-colors"
                      whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex-1">
                        <label className="text-sm font-medium text-white">Email Notifications</label>
                        <p className="text-xs text-neutral-500">Receive notifications via email</p>
                      </div>
                      <label className="relative inline-flex items-center">
                        <input
                          type="checkbox"
                          name="emailNotif"
                          checked={formState.emailNotif}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`w-10 h-5 rounded-full transition-colors ${
                            formState.emailNotif ? 'bg-[#37A794]' : 'bg-neutral-600'
                          }`}
                        >
                          <motion.div
                            className="absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full"
                            variants={toggleVariants}
                            animate={formState.emailNotif ? 'checked' : 'unchecked'}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          />
                        </div>
                      </label>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center justify-between p-3 rounded-lg border border-neutral-700 bg-neutral-800/50 hover:bg-neutral-700/30 transition-colors"
                      whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex-1">
                        <label className="text-sm font-medium text-white">Push Notifications</label>
                        <p className="text-xs text-neutral-500">Receive notifications on your desktop</p>
                      </div>
                      <label className="relative inline-flex items-center">
                        <input
                          type="checkbox"
                          name="pushNotif"
                          checked={formState.pushNotif}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`w-10 h-5 rounded-full transition-colors ${
                            formState.pushNotif ? 'bg-[#37A794]' : 'bg-neutral-600'
                          }`}
                        >
                          <motion.div
                            className="absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full"
                            variants={toggleVariants}
                            animate={formState.pushNotif ? 'checked' : 'unchecked'}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          />
                        </div>
                      </label>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center justify-between p-3 rounded-lg border border-neutral-700 bg-neutral-800/50 hover:bg-neutral-700/30 transition-colors"
                      whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="flex-1">
                        <label className="text-sm font-medium text-white">Weekly Reports</label>
                        <p className="text-xs text-neutral-500">Get weekly summary reports of your activity</p>
                      </div>
                      <label className="relative inline-flex items-center">
                        <input
                          type="checkbox"
                          name="weeklyReports"
                          checked={formState.weeklyReports}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`w-10 h-5 rounded-full transition-colors ${
                            formState.weeklyReports ? 'bg-[#37A794]' : 'bg-neutral-600'
                          }`}
                        >
                          <motion.div
                            className="absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full"
                            variants={toggleVariants}
                            animate={formState.weeklyReports ? 'checked' : 'unchecked'}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          />
                        </div>
                      </label>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center justify-between p-3 rounded-lg border border-neutral-700 bg-neutral-800/50 hover:bg-neutral-700/30 transition-colors"
                      whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex-1">
                        <label className="text-sm font-medium text-white">Candidate Updates</label>
                        <p className="text-xs text-neutral-500">Get notified when candidates update their status</p>
                      </div>
                      <label className="relative inline-flex items-center">
                        <input
                          type="checkbox"
                          name="candidateUpdates"
                          checked={formState.candidateUpdates}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`w-10 h-5 rounded-full transition-colors ${
                            formState.candidateUpdates ? 'bg-[#37A794]' : 'bg-neutral-600'
                          }`}
                        >
                          <motion.div
                            className="absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full"
                            variants={toggleVariants}
                            animate={formState.candidateUpdates ? 'checked' : 'unchecked'}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          />
                        </div>
                      </label>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="pt-4 flex justify-end"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.button 
                      className="px-4 py-2 bg-[#1D4E5F] text-white rounded-lg hover:bg-[#123040] transition"
                      whileHover={buttonVariants.hover}
                      whileTap={buttonVariants.tap}
                    >
                      Save Changes
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        )
        
      case 'integrations':
        return (
          <motion.div
            key="integrations"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Card className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 shadow-lg">
              <div className="p-6">
                <motion.h3 
                  className="text-lg font-medium text-white mb-5 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Globe size={18} className="text-[#80BDCA] mr-2" /> Integration Settings
                </motion.h3>
                
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div 
                    className="flex items-center justify-between p-4 border border-neutral-700 rounded-lg hover:bg-neutral-700/30 transition-colors"
                    whileHover={{ y: -2, scale: 1.01, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center">
                      <motion.div 
                        className="h-10 w-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-300 mr-3"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Mail size={20} />
                      </motion.div>
                      <div>
                        <h4 className="font-medium text-white">Email Integration</h4>
                        <p className="text-xs text-neutral-500">Connect your email account</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center">
                      <input
                        type="checkbox"
                        name="integrateEmail"
                        checked={formState.integrateEmail}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`w-10 h-5 rounded-full transition-colors ${
                          formState.integrateEmail ? 'bg-[#37A794]' : 'bg-neutral-600'
                        }`}
                      >
                        <motion.div
                          className="absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full"
                          variants={toggleVariants}
                          animate={formState.integrateEmail ? 'checked' : 'unchecked'}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        />
                      </div>
                    </label>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center justify-between p-4 border border-neutral-700 rounded-lg hover:bg-neutral-700/30 transition-colors"
                    whileHover={{ y: -2, scale: 1.01, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center">
                      <motion.div 
                        className="h-10 w-10 rounded-full bg-green-900/30 flex items-center justify-center text-green-300 mr-3"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Calendar size={20} />
                      </motion.div>
                      <div>
                        <h4 className="font-medium text-white">Calendar Integration</h4>
                        <p className="text-xs text-neutral-500">Connect your calendar</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center">
                      <input
                        type="checkbox"
                        name="integrateCalendar"
                        checked={formState.integrateCalendar}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`w-10 h-5 rounded-full transition-colors ${
                          formState.integrateCalendar ? 'bg-[#37A794]' : 'bg-neutral-600'
                        }`}
                      >
                        <motion.div
                          className="absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full"
                          variants={toggleVariants}
                          animate={formState.integrateCalendar ? 'checked' : 'unchecked'}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        />
                      </div>
                    </label>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center justify-between p-4 border border-neutral-700 rounded-lg hover:bg-neutral-700/30 transition-colors"
                    whileHover={{ y: -2, scale: 1.01, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center">
                      <motion.div 
                        className="h-10 w-10 rounded-full bg-purple-900/30 flex items-center justify-center text-purple-300 mr-3"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <svg height="20" width="20" viewBox="0 0 122.8 122.8" className="fill-current">
                          <path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" />
                          <path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" />
                          <path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" />
                          <path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" />
                        </svg>
                      </motion.div>
                      <div>
                        <h4 className="font-medium text-white">Slack Integration</h4>
                        <p className="text-xs text-neutral-500">Connect with Slack workspace</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center">
                      <input
                        type="checkbox"
                        name="integrateSlack"
                        checked={formState.integrateSlack}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`w-10 h-5 rounded-full transition-colors ${
                          formState.integrateSlack ? 'bg-[#37A794]' : 'bg-neutral-600'
                        }`}
                      >
                        <motion.div
                          className="absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full"
                          variants={toggleVariants}
                          animate={formState.integrateSlack ? 'checked' : 'unchecked'}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        />
                      </div>
                    </label>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center justify-between p-4 border border-neutral-700 rounded-lg hover:bg-neutral-700/30 transition-colors"
                    whileHover={{ y: -2, scale: 1.01, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center">
                      <motion.div 
                        className="h-10 w-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-300 mr-3"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <svg width="20" height="20" viewBox="0 0 72 72" className="fill-current">
                          <path d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,0 64,0 L8,0 C3.581722,0 0,3.581722 0,8 L0,64 C0,68.418278 3.581722,72 8,72 Z" />
                          <path d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z" fill="#FFFFFF" />
                        </svg>
                      </motion.div>
                      <div>
                        <h4 className="font-medium text-white">LinkedIn Integration</h4>
                        <p className="text-xs text-neutral-500">Connect with LinkedIn for job posting</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center">
                      <input
                        type="checkbox"
                        name="integrateLinkedIn"
                        checked={formState.integrateLinkedIn}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`w-10 h-5 rounded-full transition-colors ${
                          formState.integrateLinkedIn ? 'bg-[#37A794]' : 'bg-neutral-600'
                        }`}
                      >
                        <motion.div
                          className="absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full"
                          variants={toggleVariants}
                          animate={formState.integrateLinkedIn ? 'checked' : 'unchecked'}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        />
                      </div>
                    </label>
                  </motion.div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        )
        
      case 'security':
        return (
          <motion.div
            key="security"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Card className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 shadow-lg">
              <div className="p-6">
                <motion.h3 
                  className="text-lg font-medium text-white mb-5 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Shield size={18} className="text-[#80BDCA] mr-2" /> Security Settings
                </motion.h3>
                
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div 
                    className="p-4 border border-neutral-700 rounded-lg bg-neutral-800/70"
                    whileHover={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">Two-Factor Authentication</h4>
                        <p className="text-xs text-neutral-500">Protect your account with 2FA</p>
                      </div>
                      <label className="relative inline-flex items-center">
                        <input
                          type="checkbox"
                          name="twoFactorEnabled"
                          checked={formState.twoFactorEnabled}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`w-10 h-5 rounded-full transition-colors ${
                            formState.twoFactorEnabled ? 'bg-[#37A794]' : 'bg-neutral-600'
                          }`}
                        >
                          <motion.div
                            className="absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full"
                            variants={toggleVariants}
                            animate={formState.twoFactorEnabled ? 'checked' : 'unchecked'}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          />
                        </div>
                      </label>
                    </div>
                    
                    <AnimatePresence>
                      {formState.twoFactorEnabled && (
                        <motion.div 
                          className="mt-4 p-3 bg-[#1D4E5F]/10 rounded-lg"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-sm text-[#80BDCA]">
                            To complete the setup, please scan the QR code with your authenticator app.
                          </p>
                          <motion.div 
                            className="mt-3 h-32 w-32 mx-auto bg-white p-2 rounded"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {/* Placeholder for QR code */}
                            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="10" y="10" width="30" height="30" rx="2" fill="#1D4E5F"/>
                                <rect x="60" y="10" width="30" height="30" rx="2" fill="#1D4E5F"/>
                                <rect x="10" y="60" width="30" height="30" rx="2" fill="#1D4E5F"/>
                                <rect x="50" y="50" width="10" height="10" fill="#1D4E5F"/>
                                <rect x="70" y="50" width="10" height="10" fill="#1D4E5F"/>
                                <rect x="50" y="70" width="10" height="10" fill="#1D4E5F"/>
                                <rect x="70" y="70" width="10" height="10" fill="#1D4E5F"/>
                                <rect x="60" y="60" width="10" height="10" fill="#1D4E5F"/>
                                <rect x="80" y="60" width="10" height="10" fill="#1D4E5F"/>
                                <rect x="60" y="80" width="10" height="10" fill="#1D4E5F"/>
                                <rect x="80" y="80" width="10" height="10" fill="#1D4E5F"/>
                              </svg>
                            </div>
                          </motion.div>
                          <motion.div 
                            className="mt-3 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <p className="text-xs text-neutral-400">Or enter this code manually: <span className="text-white font-mono">ABCD-EFGH-IJKL</span></p>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.div 
                      className="p-4 border border-neutral-700 rounded-lg bg-neutral-800/70"
                      whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}
                    >
                      <h4 className="font-medium text-white flex items-center">
                        <Lock size={16} className="mr-2 text-neutral-400" /> Password
                      </h4>
                      <p className="text-xs text-neutral-500 mt-1">Last changed: {formState.passwordLastChanged}</p>
                      <motion.button 
                        className="mt-3 px-3 py-1.5 bg-neutral-700 text-neutral-300 text-sm rounded-lg hover:bg-neutral-600 transition"
                        whileHover={buttonVariants.hover}
                        whileTap={buttonVariants.tap}
                      >
                        Change Password
                      </motion.button>
                    </motion.div>
                    
                    <motion.div 
                      className="p-4 border border-neutral-700 rounded-lg bg-neutral-800/70"
                      whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}
                    >
                      <h4 className="font-medium text-white flex items-center">
                        <Power size={16} className="mr-2 text-neutral-400" /> Session Timeout
                      </h4>
                      <p className="text-xs text-neutral-500 mt-1">Auto logout after inactivity</p>
                      <motion.select
                        whileFocus={{ boxShadow: "0 0 0 2px rgba(29, 78, 95, 0.6)" }}
                        title="Select session timeout duration"
                        name="sessionTimeout"
                        value={formState.sessionTimeout}
                        onChange={handleChange}
                        className="mt-3 w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                      >
                        <option value="30 minutes">30 minutes</option>
                        <option value="1 hour">1 hour</option>
                        <option value="2 hours">2 hours</option>
                        <option value="4 hours">4 hours</option>
                      </motion.select>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    className="p-4 border border-dashed border-amber-700/50 bg-amber-900/10 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h4 className="font-medium text-amber-300 mb-2">Login Sessions</h4>
                    <div className="space-y-3">
                      <motion.div 
                        className="flex justify-between items-center text-sm p-2 rounded-lg bg-neutral-800/30"
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                      >
                        <div>
                          <p className="text-white">Current session - Chrome on Windows</p>
                          <p className="text-xs text-neutral-500">IP: 192.168.1.1 • Last active: Just now</p>
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs bg-[#37A794]/20 text-[#51B3A2] flex items-center">
                          <Check size={12} className="mr-1" /> Current
                        </span>
                      </motion.div>
                      <motion.div 
                        className="flex justify-between items-center text-sm p-2 rounded-lg"
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                      >
                        <div>
                          <p className="text-white">Safari on MacOS</p>
                          <p className="text-xs text-neutral-500">IP: 192.168.1.5 • Last active: 2 days ago</p>
                        </div>
                        <motion.button 
                          className="text-xs text-red-400 hover:text-red-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Revoke
                        </motion.button>
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="pt-4 flex justify-end"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.button 
                      className="px-4 py-2 bg-[#1D4E5F] text-white rounded-lg hover:bg-[#123040] transition"
                      whileHover={buttonVariants.hover}
                      whileTap={buttonVariants.tap}
                    >
                      Save Changes
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        )
        
      case 'appearance':
        return (
          <motion.div
            key="appearance"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Card className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 shadow-lg">
              <div className="p-6">
                <motion.h3 
                  className="text-lg font-medium text-white mb-5 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Palette size={18} className="text-[#80BDCA] mr-2" /> Appearance Settings
                </motion.h3>
                
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div>
                    <label className="text-sm font-medium text-neutral-300 mb-3 block">Theme</label>
                    <div className="grid grid-cols-3 gap-4">
                      <motion.div 
                        className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                          formState.theme === 'light' ? 'ring-2 ring-[#1D4E5F] border-[#1D4E5F]' : 'border-neutral-700 hover:border-neutral-500'
                        }`}
                        whileHover={{ y: -5, boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <input
                          type="radio"
                          name="theme"
                          value="light"
                          checked={formState.theme === 'light'}
                          onChange={handleChange}
                          className="sr-only"
                          id="theme-light"
                        />
                        <label htmlFor="theme-light" className="cursor-pointer">
                          <div className="h-24 bg-white">
                            <div className="h-6 bg-gray-100 border-b border-gray-200"></div>
                            <div className="flex h-18">
                              <div className="w-16 bg-gray-50 border-r border-gray-200"></div>
                              <div className="flex-1 p-2">
                                <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
                                <div className="h-3 w-32 bg-gray-200 rounded"></div>
                              </div>
                            </div>
                          </div>
                          <div className="p-2 bg-white border-t border-gray-200">
                            <p className="text-xs font-medium text-center text-gray-700">Light Theme</p>
                          </div>
                        </label>
                      </motion.div>
                      <motion.div 
                        className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                          formState.theme === 'dark' ? 'ring-2 ring-[#1D4E5F] border-[#1D4E5F]' : 'border-neutral-700 hover:border-neutral-500'
                        }`}
                        whileHover={{ y: -5, boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <input
                          type="radio"
                          name="theme"
                          value="dark"
                          checked={formState.theme === 'dark'}
                          onChange={handleChange}
                          className="sr-only"
                          id="theme-dark"
                        />
                        <label htmlFor="theme-dark" className="cursor-pointer">
                          <div className="h-24 bg-neutral-900">
                            <div className="h-6 bg-neutral-800 border-b border-neutral-700"></div>
                            <div className="flex h-18">
                              <div className="w-16 bg-[#1D4E5F] border-r border-neutral-700"></div>
                              <div className="flex-1 p-2">
                                <div className="h-3 w-24 bg-neutral-700 rounded mb-2"></div>
                                <div className="h-3 w-32 bg-neutral-700 rounded"></div>
                              </div>
                            </div>
                          </div>
                          <div className="p-2 bg-neutral-800 border-t border-neutral-700">
                            <p className="text-xs font-medium text-center text-white">Dark Theme</p>
                          </div>
                        </label>
                      </motion.div>
                      <motion.div 
                        className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                          formState.theme === 'system' ? 'ring-2 ring-[#1D4E5F] border-[#1D4E5F]' : 'border-neutral-700 hover:border-neutral-500'
                        }`}
                        whileHover={{ y: -5, boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <input
                          type="radio"
                          name="theme"
                          value="system"
                          checked={formState.theme === 'system'}
                          onChange={handleChange}
                          className="sr-only"
                          id="theme-system"
                        />
                        <label htmlFor="theme-system" className="cursor-pointer">
                          <div className="h-24 bg-gradient-to-r from-white to-neutral-900">
                            <div className="h-6 bg-gradient-to-r from-gray-100 to-neutral-800 border-b border-gray-200"></div>
                            <div className="flex h-18">
                              <div className="w-16 bg-gradient-to-r from-gray-50 to-[#1D4E5F] border-r border-gray-200"></div>
                              <div className="flex-1 p-2">
                                <div className="h-3 w-24 bg-gradient-to-r from-gray-200 to-neutral-700 rounded mb-2"></div>
                                <div className="h-3 w-32 bg-gradient-to-r from-gray-200 to-neutral-700 rounded"></div>
                              </div>
                            </div>
                          </div>
                          <div className="p-2 bg-gradient-to-r from-white to-neutral-800 border-t border-gray-200">
                            <p className="text-xs font-medium text-center text-gray-700">System Default</p>
                          </div>
                        </label>
                      </motion.div>
                    </div>
                  </div>
                  
                  <motion.div 
                    className="flex items-center justify-between p-3 rounded-lg border border-neutral-700 bg-neutral-800/50"
                    whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div>
                      <label className="text-sm font-medium text-white">Compact Mode</label>
                      <p className="text-xs text-neutral-500">Use less spacing in the UI</p>
                    </div>
                    <label className="relative inline-flex items-center">
                      <input
                        type="checkbox"
                        name="compactMode"
                        checked={formState.compactMode}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`w-10 h-5 rounded-full transition-colors ${
                          formState.compactMode ? 'bg-[#37A794]' : 'bg-neutral-600'
                        }`}
                      >
                        <motion.div
                          className="absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full"
                          variants={toggleVariants}
                          animate={formState.compactMode ? 'checked' : 'unchecked'}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        />
                      </div>
                    </label>
                  </motion.div>
                  
                  <motion.div 
                    className="pt-4 flex justify-end"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.button 
                      className="px-4 py-2 bg-[#1D4E5F] text-white rounded-lg hover:bg-[#123040] transition"
                      whileHover={buttonVariants.hover}
                      whileTap={buttonVariants.tap}
                    >
                      Save Changes
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        )
        
      default:
        return null
    }
  }

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-semibold text-[#80BDCA]">Settings</h2>
        <p className="text-neutral-400 mt-1">Manage your account and application preferences</p>
      </motion.div>

      {/* Settings Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Navigation Sidebar */}
        <motion.div 
          className="lg:w-64 flex-shrink-0"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 shadow-lg">
            <div className="p-2">
              <nav className="space-y-1">
                {settingsSections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left ${
                      activeSection === section.id
                        ? 'bg-[#1D4E5F]/20 text-white'
                        : 'text-neutral-400 hover:bg-neutral-700/50 hover:text-neutral-200'
                    }`}
                    variants={sidebarItemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <div className="flex items-center">
                      <motion.span 
                        className={`mr-3 ${activeSection === section.id ? 'text-[#80BDCA]' : 'text-neutral-500'}`}
                        whileHover={{ rotate: activeSection === section.id ? 0 : 10, scale: 1.1 }}
                      >
                        {section.icon}
                      </motion.span>
                      <span className="text-sm font-medium">{section.name}</span>
                    </div>
                    {activeSection === section.id && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight size={16} className="text-[#80BDCA]" />
                      </motion.span>
                    )}
                  </motion.button>
                ))}
              </nav>
            </div>
          </Card>
        </motion.div>
        
        {/* Content Area */}
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}