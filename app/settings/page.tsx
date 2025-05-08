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
  //Lock, 
  //Mail,
  //Power,
  //Check,
  ChevronRight, 
  Palette,
  Shield,
  //Calendar,
  Plus,
  Trash2,
  Map,
  Edit
} from 'lucide-react'
import { useOffice } from '@/contexts/OfficeContext'

// Settings navigation sections
const getSettingsSections = (userAccessLevel: string) => {
  const baseSections = [
    { id: 'profile', name: 'Profile', icon: <User size={18} /> },
    { id: 'company', name: 'Company', icon: <Building size={18} /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell size={18} /> },
    { id: 'integrations', name: 'Integrations', icon: <Globe size={18} /> },
    { id: 'security', name: 'Security', icon: <Shield size={18} /> },
    { id: 'appearance', name: 'Appearance', icon: <Palette size={18} /> },
  ];

  // Add office management section for Super Admin
  if (userAccessLevel === 'superAdmin') {
    baseSections.push({
      id: 'offices',
      name: 'Offices',
      icon: <Building size={18} />
    });
  }

  return baseSections;
};

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')
  const { userAccessLevel, offices } = useOffice();
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

    // Office settings
    newOfficeName: '',
    newOfficeCity: '',
    newOfficeCountry: '',
    newOfficeAddress: '',
    newOfficePhone: '',
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const toggleVariants = {
    checked: { x: 20 },
    unchecked: { x: 0 }
  }

  const settingsSections = getSettingsSections(userAccessLevel);

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
            {/* Profile settings content */}
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
            {/* Company settings content */}
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
            {/* Notification settings content */}
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
            {/* Integration settings content */}
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
            {/* Security settings content */}
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
            {/* Appearance settings content */}
          </motion.div>
        )
      
      case 'offices':
        return (
          <motion.div
            key="offices"
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
                  <Building size={18} className="text-[#80BDCA] mr-2" /> Office Management
                </motion.h3>
                
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Office List */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-neutral-300">Current Offices</h4>
                      <motion.button
                        className="text-xs flex items-center px-2 py-1 bg-[#1D4E5F] text-white rounded hover:bg-[#123040]"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Plus size={14} className="mr-1" /> Add Office
                      </motion.button>
                    </div>
                    
                    <div className="space-y-3">
                      {offices.map((office) => (
                        <motion.div 
                          key={office.id}
                          className="p-3 bg-neutral-800 border border-neutral-700 rounded-lg flex items-center justify-between"
                          whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}
                        >
                          <div className="flex items-center">
                            <div className="p-2 bg-[#1D4E5F]/20 rounded-lg mr-3">
                              <Map size={18} className="text-[#80BDCA]" />
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-white">{office.name}</h5>
                              <p className="text-xs text-neutral-400">{office.city}</p>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <motion.button
                              className="p-1.5 rounded hover:bg-neutral-700"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              title="Edit office"
                            >
                              <Edit size={16} className="text-neutral-400" />
                            </motion.button>
                            
                            <motion.button
                              className="p-1.5 rounded hover:bg-neutral-700"
                              whileHover={{ scale: 1.1, color: '#ef4444' }}
                              whileTap={{ scale: 0.9 }}
                              title="Delete office"
                              disabled={offices.length <= 1}
                            >
                              <Trash2 size={16} className={offices.length <= 1 ? "text-neutral-600" : "text-neutral-400"} />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Add New Office Form */}
                  <div className="mt-8 pt-6 border-t border-neutral-700">
                    <h4 className="text-sm font-medium text-neutral-300 mb-4">Add New Office</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-1">Office Name</label>
                        <motion.input
                          whileFocus={{ boxShadow: "0 0 0 2px rgba(29, 78, 95, 0.6)" }}
                          type="text"
                          name="newOfficeName"
                          value={formState.newOfficeName}
                          onChange={handleChange}
                          className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-1">City</label>
                        <motion.input
                          whileFocus={{ boxShadow: "0 0 0 2px rgba(29, 78, 95, 0.6)" }}
                          type="text"
                          name="newOfficeCity"
                          value={formState.newOfficeCity}
                          onChange={handleChange}
                          className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                        />
                      </div>
                    </div>
                    
                    <motion.button 
                      className="mt-4 px-4 py-2 bg-[#1D4E5F] text-white rounded-lg hover:bg-[#123040] transition"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Plus size={16} className="inline mr-2" />
                      Create Office
                    </motion.button>
                  </div>
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