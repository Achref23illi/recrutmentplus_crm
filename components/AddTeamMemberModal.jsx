// components/AddTeamMemberModal.jsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { X, UserPlus, Mail, Phone, Building2, Briefcase, Shield, Image } from 'lucide-react'

export default function AddTeamMemberModal({ isOpen, onClose }) {
  const [member, setMember] = useState({
    name: '',
    role: 'Recruiter',
    department: 'Recruitment',
    email: '',
    phone: '',
    status: 'active',
    avatar: null
  })
  
  const [avatarPreview, setAvatarPreview] = useState(null)
  
  const modalRef = useRef(null)
  const initialFocusRef = useRef(null)

  // Available roles
  const roles = [
    'Lead Recruiter',
    'Recruitment Consultant', 
    'HR Manager', 
    'Technical Recruiter', 
    'Onboarding Specialist', 
    'HR Coordinator',
    'Recruiter'
  ]
  
  // Available departments
  const departments = [
    'Recruitment',
    'HR',
    'Executive',
    'IT Support'
  ]
  
  // Status options
  const statusOptions = [
    'active',
    'on leave',
    'inactive'
  ]

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === 'Escape') onClose()
    }
    
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleClickOutside)
      // Prevent scrolling of the body when modal is open
      document.body.style.overflow = 'hidden'
      // Set focus to the first input when modal opens
      setTimeout(() => {
        if (initialFocusRef.current) initialFocusRef.current.focus()
      }, 0)
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])

  const handleChange = (e) => {
    const { name, value } = e.target
    setMember(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    // Preview the selected image
    const reader = new FileReader()
    reader.onload = () => {
      setAvatarPreview(reader.result)
    }
    reader.readAsDataURL(file)
    
    setMember(prev => ({
      ...prev,
      avatar: file
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Generate initials for display if no avatar is provided
    const initials = member.name
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
    
    const currentDate = new Date()
    const joinedDate = currentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    
    const newMember = {
      id: Date.now(),
      name: member.name,
      role: member.role,
      department: member.department,
      contact: {
        email: member.email,
        phone: member.phone
      },
      status: member.status,
      joinedDate,
      avatar: member.avatar ? URL.createObjectURL(member.avatar) : null,
      initials: initials,
      assigned: 0,
      completed: 0
    }
    
    onClose(newMember)
    
    // Reset form
    setMember({
      name: '',
      role: 'Recruiter',
      department: 'Recruitment',
      email: '',
      phone: '',
      status: 'active',
      avatar: null
    })
    setAvatarPreview(null)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[var(--card)] rounded-lg shadow-xl border border-[var(--border)]"
      >
        <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-lg bg-[var(--primary-light)] flex items-center justify-center text-[var(--primary-foreground)] mr-3">
              <UserPlus className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold text-[var(--foreground)]">Add Team Member</h2>
          </div>
          <button 
            onClick={() => onClose()}
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-[var(--secondary)] transition-colors"
          >
            <X className="h-5 w-5 text-[var(--muted-foreground)]" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center">
                <div className="mb-3">
                  {avatarPreview ? (
                    <div className="h-24 w-24 rounded-full overflow-hidden">
                      <img 
                        src={avatarPreview} 
                        alt="Avatar Preview" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-[var(--secondary)] flex items-center justify-center">
                      <Image className="h-10 w-10 text-[var(--muted-foreground)]" />
                    </div>
                  )}
                </div>
                <label 
                  htmlFor="avatar-upload" 
                  className="px-3 py-1.5 text-sm bg-[var(--secondary)] hover:bg-[var(--muted)] text-[var(--foreground)] rounded-md cursor-pointer transition-colors"
                >
                  Upload Photo
                </label>
                <input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleAvatarChange}
                />
                <p className="mt-2 text-xs text-[var(--muted-foreground)]">
                  Recommended: Square image, at least 300x300px
                </p>
              </div>

              {/* Basic Information */}
              <div>
                <h3 className="text-sm font-medium text-[var(--foreground)] mb-3">
                  Basic Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                      Full Name*
                    </label>
                    <input
                      ref={initialFocusRef}
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={member.name}
                      onChange={handleChange}
                      placeholder="e.g. John Smith"
                      className="block w-full rounded-lg border border-[var(--border)] py-3 px-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                        Role*
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Briefcase className="h-5 w-5 text-[var(--muted-foreground)]" />
                        </div>
                        <select
                          id="role"
                          name="role"
                          required
                          value={member.role}
                          onChange={handleChange}
                          className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                        >
                          {roles.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="department" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                        Department*
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building2 className="h-5 w-5 text-[var(--muted-foreground)]" />
                        </div>
                        <select
                          id="department"
                          name="department"
                          required
                          value={member.department}
                          onChange={handleChange}
                          className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                        >
                          {departments.map((dept) => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Information */}
              <div>
                <h3 className="text-sm font-medium text-[var(--foreground)] mb-3">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                      Email*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-[var(--muted-foreground)]" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={member.email}
                        onChange={handleChange}
                        placeholder="e.g. john.smith@example.com"
                        className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                      Phone
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-[var(--muted-foreground)]" />
                      </div>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={member.phone}
                        onChange={handleChange}
                        placeholder="e.g. (555) 123-4567"
                        className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Status */}
              <div>
                <h3 className="text-sm font-medium text-[var(--foreground)] mb-3">
                  Status
                </h3>
                <div className="flex space-x-4">
                  {statusOptions.map((status) => (
                    <label key={status} className="flex items-center">
                      <input 
                        type="radio" 
                        name="status" 
                        value={status} 
                        checked={member.status === status}
                        onChange={handleChange}
                        className="h-4 w-4 text-[var(--primary)] border-[var(--border)] focus:ring-[var(--ring)]" 
                      />
                      <span className="ml-2 text-sm text-[var(--foreground)] capitalize">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-end p-6 border-t border-[var(--border)] bg-[var(--secondary)]">
            <button
              type="button"
              onClick={() => onClose()}
              className="px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:text-[var(--muted-foreground)] transition-colors mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-light)] transition-colors"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}