// components/AddCompanyModal.jsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Building2, MapPin, Users, Briefcase, Phone, Mail, Globe } from 'lucide-react'

export default function AddCompanyModal({ isOpen, onClose }) {
  const [company, setCompany] = useState({
    name: '',
    industry: 'Technology',
    location: '',
    size: '10-50',
    openPositions: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: ''
  })

  const modalRef = useRef(null)
  const initialFocusRef = useRef(null)

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
    setCompany(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Generate a simple logo from the company name (first letter of each word)
    const logo = company.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)

    const newCompany = {
      ...company,
      id: Date.now(), // temporary ID
      logo,
      lastActivity: 'Just now'
    }
    
    // Here you would normally send the data to your backend
    console.log('Company data to submit:', newCompany)
    
    // For now, we'll just close the modal
    onClose(newCompany)
    
    // Reset form
    setCompany({
      name: '',
      industry: 'Technology',
      location: '',
      size: '10-50',
      openPositions: '',
      contactPerson: '',
      email: '',
      phone: '',
      website: ''
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[var(--card)] rounded-lg shadow-xl border border-[var(--border)]"
      >
        <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-lg bg-[var(--primary-light)] flex items-center justify-center text-[var(--primary-foreground)] mr-3">
              <Building2 className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold text-[var(--foreground)]">Add New Company</h2>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Company Name*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-[var(--muted-foreground)]" />
                  </div>
                  <input
                    ref={initialFocusRef}
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={company.name}
                    onChange={handleChange}
                    placeholder="e.g. Acme Corporation"
                    className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                  />
                </div>
              </div>

              {/* Industry */}
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Industry*
                </label>
                <select
                  id="industry"
                  name="industry"
                  required
                  value={company.industry}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-[var(--border)] py-3 px-3 bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                >
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Education">Education</option>
                  <option value="Retail">Retail</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Location*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-[var(--muted-foreground)]" />
                  </div>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    value={company.location}
                    onChange={handleChange}
                    placeholder="e.g. New York, NY"
                    className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                  />
                </div>
              </div>
              
              {/* Company Size */}
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Company Size*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-[var(--muted-foreground)]" />
                  </div>
                  <select
                    id="size"
                    name="size"
                    required
                    value={company.size}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                  >
                    <option value="1-10">1-10</option>
                    <option value="10-50">10-50</option>
                    <option value="50-100">50-100</option>
                    <option value="100-500">100-500</option>
                    <option value="500-1000">500-1000</option>
                    <option value="1000+">1000+</option>
                  </select>
                </div>
              </div>
              
              {/* Open Positions */}
              <div>
                <label htmlFor="openPositions" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Open Positions
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-[var(--muted-foreground)]" />
                  </div>
                  <input
                    id="openPositions"
                    name="openPositions"
                    type="number"
                    min="0"
                    value={company.openPositions}
                    onChange={handleChange}
                    placeholder="e.g. 5"
                    className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                  />
                </div>
              </div>
              
              {/* Contact Person */}
              <div>
                <label htmlFor="contactPerson" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Contact Person*
                </label>
                <input
                  id="contactPerson"
                  name="contactPerson"
                  type="text"
                  required
                  value={company.contactPerson}
                  onChange={handleChange}
                  placeholder="e.g. John Smith"
                  className="block w-full rounded-lg border border-[var(--border)] py-3 px-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                />
              </div>
              
              {/* Email */}
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
                    value={company.email}
                    onChange={handleChange}
                    placeholder="e.g. contact@example.com"
                    className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                  />
                </div>
              </div>
              
              {/* Phone */}
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
                    type="text"
                    value={company.phone}
                    onChange={handleChange}
                    placeholder="e.g. (555) 123-4567"
                    className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                  />
                </div>
              </div>
              
              {/* Website */}
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Website
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="h-5 w-5 text-[var(--muted-foreground)]" />
                  </div>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    value={company.website}
                    onChange={handleChange}
                    placeholder="e.g. example.com"
                    className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                  />
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
              Create Company
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}