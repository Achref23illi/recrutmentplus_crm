// filepath: c:\Users\Achref\Projects\Big Projects\recruitmentplus_crm\app\team\AddTeamMemberModal.tsx
'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Upload, Save } from 'lucide-react'

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
  }) => void
}

export default function AddTeamMemberModal({ isOpen, onClose, onSave }: AddTeamMemberModalProps) {
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
  const handleSubmit = (e: React.FormEvent) => {
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
      
      // In a real app, this would make an API call to create the team member
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
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Personal Information */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-4">
              <h3 className="text-base font-medium text-white">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-neutral-300 mb-1">
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full border ${errors.firstName ? 'border-red-500' : 'border-neutral-700'} bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]`}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-neutral-300 mb-1">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full border ${errors.lastName ? 'border-red-500' : 'border-neutral-700'} bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]`}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border ${errors.email ? 'border-red-500' : 'border-neutral-700'} bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]`}
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-neutral-300 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                    placeholder="Enter department"
                  />
                </div>
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-neutral-300 mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                    placeholder="Enter position"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-neutral-700">
              <h3 className="text-base font-medium text-white">System Role & Access</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-neutral-300 mb-1">
                    Role*
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`w-full border ${errors.role ? 'border-red-500' : 'border-neutral-700'} bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]`}
                  >
                    <option value="">Select a role</option>
                    {roleOptions.map(role => (
                      <option key={role.id} value={role.id}>{role.label}</option>
                    ))}
                  </select>
                  {errors.role && (
                    <p className="mt-1 text-xs text-red-500">{errors.role}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-neutral-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                    placeholder="Enter location"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Access Level*
                </label>
                <div className="space-y-2">
                  {accessLevelOptions.map(option => (
                    <label 
                      key={option.id} 
                      className={`flex items-start p-2 border ${
                        formData.accessLevel === option.id 
                          ? 'border-[#1D4E5F] bg-[#1D4E5F]/10' 
                          : 'border-neutral-700 hover:border-neutral-600'
                      } rounded-lg cursor-pointer transition-colors`}
                    >
                      <input
                        type="radio"
                        name="accessLevel"
                        value={option.id}
                        checked={formData.accessLevel === option.id}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border-2 mt-0.5 mr-3 flex-shrink-0 ${
                        formData.accessLevel === option.id
                          ? 'border-[#1D4E5F] bg-[#1D4E5F]'
                          : 'border-neutral-500'
                      }`}>
                        {formData.accessLevel === option.id && (
                          <div className="w-2 h-2 bg-white rounded-full m-[2px]"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">{option.label}</div>
                        <div className="text-xs text-neutral-400">{option.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.accessLevel && (
                  <p className="mt-2 text-xs text-red-500">{errors.accessLevel}</p>
                )}
              </div>
              
              <div className="flex items-center pt-2">
                <input
                  type="checkbox"
                  id="sendInvite"
                  name="sendInvite"
                  checked={formData.sendInvite}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#1D4E5F] bg-neutral-900 border-neutral-700"
                />
                <label htmlFor="sendInvite" className="ml-2 text-sm text-neutral-300">
                  Send email invite to team member
                </label>
              </div>
            </div>
          </div>
          
          {/* Right Column - Avatar and Start Date */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-base font-medium text-white">Profile Picture</h3>
              
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-lg bg-[#1D4E5F]/30 flex items-center justify-center text-[#80BDCA] font-semibold text-3xl mb-4">
                  {getInitials()}
                </div>
                
                <button
                  type="button"
                  className="px-3 py-1.5 border border-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-700 transition flex items-center text-sm"
                >
                  <Upload size={14} className="mr-1.5" /> Upload Photo
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-base font-medium text-white">Start Date</h3>
              
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-neutral-300 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end mt-8 pt-4 border-t border-neutral-700 gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 border border-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-700 transition"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 bg-[#1D4E5F] text-white rounded-lg transition flex items-center ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#123040]'
            }`}
          >
            <Save size={16} className="mr-2" />
            {isSubmitting ? 'Adding...' : 'Add Team Member'}
          </button>
        </div>
      </form>
    </Modal>
  )
}