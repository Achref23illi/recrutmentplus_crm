// filepath: c:\Users\Achref\Projects\Big Projects\recruitmentplus_crm\app\team\AddTeamMemberModal.tsx
'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Upload, Save } from 'lucide-react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { useOffice } from '@/contexts/OfficeContext'

// Role options for the team member
const roleOptions = [
  { id: 'admin', label: 'Admin' },
  { id: 'recruiter', label: 'Recruiter' },
  { id: 'consultant', label: 'Consultant' },
  { id: 'hr-manager', label: 'HR Manager' },
  { id: 'interviewer', label: 'Interviewer' },
  { id: 'coordinator', label: 'Recruitment Coordinator' },
]

// Access level options
const accessLevelOptions = [
  { id: 'view', label: 'View Only', description: 'Can only view data but cannot make changes' },
  { id: 'edit', label: 'Edit', description: 'Can view and edit data but cannot delete or manage team members' },
  { id: 'admin', label: 'Admin', description: 'Full access to all features and settings' },
]

// Animation variants
const formGroupVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.4,
    }
  })
};

const inputVariants: Variants = {
  focus: { 
    borderColor: "#1D4E5F",
    boxShadow: "0 0 0 2px rgba(29, 78, 95, 0.25)",
    transition: { duration: 0.2 }
  }
};

const buttonVariants: Variants = {
  hover: { 
    scale: 1.05, 
    backgroundColor: "#123040",
    transition: { duration: 0.2 } 
  },
  tap: { scale: 0.95 }
};

interface AddTeamMemberModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (teamMember: {
    id: string
    name: string
    firstName: string
    lastName: string
    email: string
    phone: string
    role: string
    accessLevel: string
    sendInvite: boolean
    department: string
    position: string
    location: string
    startDate: string
    avatar: string | null
    tasksCompleted: number
    activeRecruitments: number
    successfulPlacements: number
    lastActive: string
    officeId: string
  }) => void
}

export default function AddTeamMemberModal({ isOpen, onClose, onSave }: AddTeamMemberModalProps) {
  const { offices, currentOffice, userAccessLevel } = useOffice();

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    accessLevel: '',
    sendInvite: true,
    department: '',
    position: '',
    location: '',
    startDate: '',
    avatar: null,
    officeId: currentOffice.id, // Default to current office
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Update form data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }
  
  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.role) {
      newErrors.role = 'Role is required'
    }
    
    if (!formData.accessLevel) {
      newErrors.accessLevel = 'Access level is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsSubmitting(true)
      
      // Create team member object with combined full name
      const teamMember = {
        ...formData,
        id: `tm-${Date.now()}`,
        name: `${formData.firstName} ${formData.lastName}`,
        avatar: `${formData.firstName[0] || ''}${formData.lastName[0] || ''}`,
        tasksCompleted: 0,
        activeRecruitments: 0,
        successfulPlacements: 0,
        lastActive: 'Just added'
      }
      
      // Simulate API call with a delay
      setTimeout(() => {
        setIsSubmitting(false)
        onSave(teamMember)
        resetForm()
        onClose()
      }, 1000)
    }
  }
  
  // Reset form when closing
  const handleClose = () => {
    resetForm()
    onClose()
  }
  
  // Reset form data and errors
  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: '',
      accessLevel: '',
      sendInvite: true,
      department: '',
      position: '',
      location: '',
      startDate: '',
      avatar: null,
      officeId: currentOffice.id,
    })
    setErrors({})
  }
  
  // Avatar initials generator
  const getInitials = (): string => {
    const firstName = formData.firstName.trim()
    const lastName = formData.lastName.trim()
    
    if (!firstName && !lastName) return 'TM'
    if (!firstName) return lastName[0].toUpperCase()
    if (!lastName) return firstName[0].toUpperCase()
    return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose} 
      title="Add Team Member"
      className="max-w-5xl"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column - Personal Information */}
              <div className="md:col-span-2 space-y-6">
                <motion.div 
                  className="space-y-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                  <motion.h3 
                    className="text-base font-medium text-white"
                    variants={formGroupVariants}
                    custom={0}
                  >
                    Personal Information
                  </motion.h3>
                  
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    variants={formGroupVariants}
                    custom={1}
                  >
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-neutral-300 mb-1">
                        First Name*
                      </label>
                      <motion.input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full border ${errors.firstName ? 'border-red-500' : 'border-neutral-700'} bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]`}
                        placeholder="Enter first name"
                        variants={inputVariants}
                        whileFocus="focus"
                        whileHover={{ borderColor: "#1D4E5F" }}
                      />
                      <AnimatePresence>
                        {errors.firstName && (
                          <motion.p 
                            className="mt-1 text-xs text-red-500"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {errors.firstName}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-neutral-300 mb-1">
                        Last Name*
                      </label>
                      <motion.input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full border ${errors.lastName ? 'border-red-500' : 'border-neutral-700'} bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]`}
                        placeholder="Enter last name"
                        variants={inputVariants}
                        whileFocus="focus"
                        whileHover={{ borderColor: "#1D4E5F" }}
                      />
                      <AnimatePresence>
                        {errors.lastName && (
                          <motion.p 
                            className="mt-1 text-xs text-red-500"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {errors.lastName}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    variants={formGroupVariants}
                    custom={2}
                  >
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">
                        Email Address*
                      </label>
                      <motion.input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full border ${errors.email ? 'border-red-500' : 'border-neutral-700'} bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]`}
                        placeholder="Enter email address"
                        variants={inputVariants}
                        whileFocus="focus"
                        whileHover={{ borderColor: "#1D4E5F" }}
                      />
                      <AnimatePresence>
                        {errors.email && (
                          <motion.p 
                            className="mt-1 text-xs text-red-500"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-300 mb-1">
                        Phone Number
                      </label>
                      <motion.input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                        placeholder="Enter phone number"
                        variants={inputVariants}
                        whileFocus="focus"
                        whileHover={{ borderColor: "#1D4E5F" }}
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    variants={formGroupVariants}
                    custom={3}
                  >
                    <div>
                      <label htmlFor="department" className="block text-sm font-medium text-neutral-300 mb-1">
                        Department
                      </label>
                      <motion.input
                        type="text"
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                        placeholder="Enter department"
                        variants={inputVariants}
                        whileFocus="focus"
                        whileHover={{ borderColor: "#1D4E5F" }}
                      />
                    </div>
                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-neutral-300 mb-1">
                        Position
                      </label>
                      <motion.input
                        type="text"
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                        placeholder="Enter position"
                        variants={inputVariants}
                        whileFocus="focus"
                        whileHover={{ borderColor: "#1D4E5F" }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="space-y-4 pt-4 border-t border-neutral-700"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.3
                      }
                    }
                  }}
                >
                  <motion.h3 
                    className="text-base font-medium text-white"
                    variants={formGroupVariants}
                    custom={0}
                  >
                    System Role & Access
                  </motion.h3>
                  
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    variants={formGroupVariants}
                    custom={1}
                  >
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-neutral-300 mb-1">
                        Role*
                      </label>
                      <motion.select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className={`w-full border ${errors.role ? 'border-red-500' : 'border-neutral-700'} bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]`}
                        variants={inputVariants}
                        whileFocus="focus"
                        whileHover={{ borderColor: "#1D4E5F" }}
                      >
                        <option value="">Select a role</option>
                        {roleOptions.map(role => (
                          <option key={role.id} value={role.id}>{role.label}</option>
                        ))}
                      </motion.select>
                      <AnimatePresence>
                        {errors.role && (
                          <motion.p 
                            className="mt-1 text-xs text-red-500"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {errors.role}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-neutral-300 mb-1">
                        Location
                      </label>
                      <motion.input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                        placeholder="Enter location"
                        variants={inputVariants}
                        whileFocus="focus"
                        whileHover={{ borderColor: "#1D4E5F" }}
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    variants={formGroupVariants}
                    custom={2}
                  >
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Access Level*
                    </label>
                    <div className="space-y-2">
                      {accessLevelOptions.map((option, index) => (
                        <motion.label 
                          key={option.id} 
                          className={`flex items-start p-2 border ${
                            formData.accessLevel === option.id 
                              ? 'border-[#1D4E5F] bg-[#1D4E5F]/10' 
                              : 'border-neutral-700 hover:border-neutral-600'
                          } rounded-lg cursor-pointer transition-colors`}
                          whileHover={{ 
                            borderColor: formData.accessLevel === option.id ? "#1D4E5F" : "#80BDCA",
                            backgroundColor: formData.accessLevel === option.id ? "rgba(29, 78, 95, 0.15)" : "rgba(29, 78, 95, 0.05)"
                          }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ 
                            opacity: 1, 
                            x: 0,
                            transition: { delay: 0.3 + (index * 0.1) }
                          }}
                        >
                          <input
                            type="radio"
                            name="accessLevel"
                            value={option.id}
                            checked={formData.accessLevel === option.id}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <motion.div 
                            className={`w-4 h-4 rounded-full border-2 mt-0.5 mr-3 flex-shrink-0 ${
                              formData.accessLevel === option.id
                                ? 'border-[#1D4E5F] bg-[#1D4E5F]'
                                : 'border-neutral-500'
                            }`}
                            initial={false}
                            animate={formData.accessLevel === option.id ? 
                              { scale: [1, 1.2, 1], backgroundColor: "#1D4E5F", borderColor: "#1D4E5F" } : 
                              { scale: 1, backgroundColor: "transparent", borderColor: "#6B7280" }
                            }
                            transition={{ duration: 0.3 }}
                          >
                            {formData.accessLevel === option.id && (
                              <motion.div 
                                className="w-2 h-2 bg-white rounded-full m-[2px]"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              ></motion.div>
                            )}
                          </motion.div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-white">{option.label}</div>
                            <div className="text-xs text-neutral-400">{option.description}</div>
                          </div>
                        </motion.label>
                      ))}
                    </div>
                    <AnimatePresence>
                      {errors.accessLevel && (
                        <motion.p 
                          className="mt-2 text-xs text-red-500"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {errors.accessLevel}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center pt-2"
                    variants={formGroupVariants}
                    custom={3}
                  >
                    <motion.input
                      type="checkbox"
                      id="sendInvite"
                      name="sendInvite"
                      checked={formData.sendInvite}
                      onChange={handleChange}
                      className="w-4 h-4 accent-[#1D4E5F] bg-neutral-900 border-neutral-700"
                      whileHover={{ scale: 1.2 }}
                    />
                    <motion.label 
                      htmlFor="sendInvite" 
                      className="ml-2 text-sm text-neutral-300"
                      whileHover={{ color: "#80BDCA" }}
                    >
                      Send email invite to team member
                    </motion.label>
                  </motion.div>
                </motion.div>

                {/* Office selection (for superAdmin only) */}
                {userAccessLevel === 'superAdmin' && (
                  <motion.div 
                    className="space-y-4 pt-4 border-t border-neutral-700"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.3
                        }
                      }
                    }}
                  >
                    <motion.h3 
                      className="text-base font-medium text-white"
                      variants={formGroupVariants}
                      custom={0}
                    >
                      Office Selection
                    </motion.h3>
                    
                    <motion.div 
                      className="mb-4"
                      variants={formGroupVariants}
                      custom={3}
                    >
                      <label htmlFor="office" className="block text-sm font-medium text-neutral-300 mb-1">
                        Office
                      </label>
                      <motion.select
                        id="office"
                        name="officeId"
                        value={formData.officeId}
                        onChange={handleChange}
                        className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                        variants={inputVariants}
                        whileFocus="focus"
                      >
                        {offices.map(office => (
                          <option key={office.id} value={office.id}>{office.city} Office</option>
                        ))}
                      </motion.select>
                    </motion.div>
                  </motion.div>
                )}
              </div>
              
              {/* Right Column - Avatar and Start Date */}
              <motion.div 
                className="space-y-6"
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: {
                      delay: 0.4,
                      duration: 0.5,
                      staggerChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  className="space-y-4"
                  variants={formGroupVariants}
                  custom={0}
                >
                  <h3 className="text-base font-medium text-white">Profile Picture</h3>
                  
                  <div className="flex flex-col items-center">
                    <motion.div 
                      className="h-24 w-24 rounded-lg bg-[#1D4E5F]/30 flex items-center justify-center text-[#80BDCA] font-semibold text-3xl mb-4"
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: "0 0 15px rgba(29, 78, 95, 0.5)",
                        backgroundColor: "rgba(29, 78, 95, 0.5)"
                      }}
                      animate={{
                        rotate: [0, 2, 0, -2, 0],
                        transition: {
                          duration: 0.5,
                          repeat: 0,
                          repeatType: "reverse",
                          ease: "easeInOut",
                        },
                      }}
                    >
                      {getInitials()}
                    </motion.div>
                    
                    <motion.button
                      type="button"
                      className="px-3 py-1.5 border border-neutral-700 text-neutral-300 rounded-lg transition flex items-center text-sm"
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: "#1D4E5F",
                        color: "white",
                        borderColor: "#1D4E5F"
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Upload size={14} className="mr-1.5" /> Upload Photo
                    </motion.button>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="space-y-4"
                  variants={formGroupVariants}
                  custom={1}
                >
                  <h3 className="text-base font-medium text-white">Start Date</h3>
                  
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-neutral-300 mb-1">
                      Start Date
                    </label>
                    <motion.input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                      variants={inputVariants}
                      whileFocus="focus"
                      whileHover={{ borderColor: "#1D4E5F" }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Form Actions */}
            <motion.div 
              className="flex justify-end mt-8 pt-4 border-t border-neutral-700 gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <motion.button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-neutral-700 text-neutral-300 rounded-lg"
                whileHover={{ 
                  scale: 1.02, 
                  backgroundColor: "rgba(255, 255, 255, 0.1)", 
                  borderColor: "#80BDCA" 
                }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 bg-[#1D4E5F] text-white rounded-lg transition flex items-center ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                variants={buttonVariants}
                whileHover={isSubmitting ? {} : "hover"}
                whileTap={isSubmitting ? {} : "tap"}
                animate={isSubmitting ? 
                  { scale: [1, 1.02, 1], transition: { duration: 1, repeat: Infinity } } : 
                  {}
                }
              >
                <Save size={16} className="mr-2" />
                {isSubmitting ? 'Adding...' : 'Add Team Member'}
              </motion.button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </Modal>
  )
}