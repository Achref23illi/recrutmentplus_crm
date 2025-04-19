// components/AddPositionModal.jsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Briefcase, Building, MapPin, DollarSign, Users, Calendar } from 'lucide-react'

export default function AddPositionModal({ isOpen, onClose }) {
  const [position, setPosition] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    department: '',
    deadline: '',
    description: '',
    requirements: '',
    responsibilities: '',
    candidate: '' // Added candidate field
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
    setPosition(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would normally send the data to your backend
    console.log('Position data to submit:', position)
    // For now, we'll just close the modal
    onClose()
    // Reset form
    setPosition({
      title: '',
      company: '',
      location: '',
      type: 'Full-time',
      salary: '',
      department: '',
      deadline: '',
      description: '',
      requirements: '',
      responsibilities: '',
      candidate: '' // Reset candidate field too
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
              <Briefcase className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold text-[var(--foreground)]">Add New Position</h2>
          </div>
          <button 
            onClick={onClose}
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-[var(--secondary)] transition-colors"
          >
            <X className="h-5 w-5 text-[var(--muted-foreground)]" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Position Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Position Title*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-[var(--muted-foreground)]" />
                  </div>
                  <input
                    ref={initialFocusRef}
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={position.title}
                    onChange={handleChange}
                    placeholder="e.g. Frontend Developer"
                    className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Company*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-[var(--muted-foreground)]" />
                  </div>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    value={position.company}
                    onChange={handleChange}
                    placeholder="e.g. Acme Inc"
                    className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                  />
                </div>
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
                    value={position.location}
                    onChange={handleChange}
                    placeholder="e.g. New York, NY (Remote)"
                    className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                  />
                </div>
              </div>
              
              {/* Employment Type */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Employment Type*
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  value={position.type}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-[var(--border)] py-3 px-3 bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              
              {/* Salary */}
              <div>
                <label htmlFor="salary" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Salary Range
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-[var(--muted-foreground)]" />
                  </div>
                  <input
                    id="salary"
                    name="salary"
                    type="text"
                    value={position.salary}
                    onChange={handleChange}
                    placeholder="e.g. $80,000 - $100,000 /year"
                    className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                  />
                </div>
              </div>
              
              {/* Department */}
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Department
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-[var(--muted-foreground)]" />
                  </div>
                  <input
                    id="department"
                    name="department"
                    type="text"
                    value={position.department}
                    onChange={handleChange}
                    placeholder="e.g. Engineering, Marketing"
                    className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                  />
                </div>
              </div>
              
              {/* Application Deadline */}
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Application Deadline
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-[var(--muted-foreground)]" />
                  </div>
                  <input
                    id="deadline"
                    name="deadline"
                    type="date"
                    value={position.deadline}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                  />
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                Job Description*
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={position.description}
                onChange={handleChange}
                rows={4}
                placeholder="Provide a detailed description of the position..."
                className="block w-full rounded-lg border border-[var(--border)] py-3 px-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
              />
            </div>
            
            {/* Requirements */}
            <div className="mb-6">
              <label htmlFor="requirements" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                Requirements
              </label>
              <textarea
                id="requirements"
                name="requirements"
                value={position.requirements}
                onChange={handleChange}
                rows={3}
                placeholder="List the skills, experience, and qualifications required..."
                className="block w-full rounded-lg border border-[var(--border)] py-3 px-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
              />
            </div>
            
            {/* Responsibilities */}
            <div className="mb-6">
              <label htmlFor="responsibilities" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                Responsibilities
              </label>
              <textarea
                id="responsibilities"
                name="responsibilities"
                value={position.responsibilities}
                onChange={handleChange}
                rows={3}
                placeholder="Describe the key responsibilities and duties for this role..."
                className="block w-full rounded-lg border border-[var(--border)] py-3 px-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
              />
            </div>

            {/* Candidate */}
            <div>
              <label htmlFor="candidate" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                Candidate
              </label>
              <textarea
                id="candidate"
                name="candidate"
                value={position.candidate}
                onChange={handleChange}
                rows={3}
                placeholder="Provide details about the ideal candidate..."
                className="block w-full rounded-lg border border-[var(--border)] py-3 px-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-end p-6 border-t border-[var(--border)] bg-[var(--secondary)]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:text-[var(--muted-foreground)] transition-colors mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-light)] transition-colors"
            >
              Create Position
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}