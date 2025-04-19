// components/AddCandidateModal.jsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { X, User, Mail, Phone, MapPin, Briefcase, FileText, Calendar, GraduationCap, Award } from 'lucide-react'

export default function AddCandidateModal({ isOpen, onClose, onAddCandidate }) {
  const [candidate, setCandidate] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    position: '',
    status: 'New',
    experience: '',
    education: '',
    skills: '',
    resume: null,
    notes: ''
  })
  
  const [errors, setErrors] = useState({})
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
      document.body.style.overflow = 'hidden'
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
    setCandidate(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    setCandidate(prev => ({
      ...prev,
      resume: e.target.files[0] || null
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simple validation
    const newErrors = {}
    if (!candidate.firstName.trim()) newErrors.firstName = "First name is required"
    if (!candidate.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!candidate.email.trim()) newErrors.email = "Email is required"
    if (candidate.email && !/\S+@\S+\.\S+/.test(candidate.email)) newErrors.email = "Email is invalid"
    if (!candidate.position.trim()) newErrors.position = "Position is required"
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    // Format the candidate data for the list display
    const formattedCandidate = {
      id: Date.now(), // Generate a temporary ID
      name: `${candidate.firstName} ${candidate.lastName}`,
      position: candidate.position,
      experience: candidate.experience || 'Not specified',
      location: candidate.location || 'Remote',
      status: candidate.status,
      rating: 0, // Default rating for new candidates
      skills: candidate.skills ? candidate.skills.split(',').map(skill => skill.trim()) : [],
      email: candidate.email,
      lastContact: 'Just now',
      avatar: `${candidate.firstName[0]}${candidate.lastName[0]}`,
      notes: candidate.notes
    }
    
    // Pass the formatted candidate to the parent component
    onAddCandidate(formattedCandidate)
    
    // Close the modal
    onClose()
    
    // Reset form
    setCandidate({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      position: '',
      status: 'New',
      experience: '',
      education: '',
      skills: '',
      resume: null,
      notes: ''
    })
    setErrors({})
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
              <User className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold text-[var(--foreground)]">Add New Candidate</h2>
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
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  First Name*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-[var(--muted-foreground)]" />
                  </div>
                  <input
                    ref={initialFocusRef}
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={candidate.firstName}
                    onChange={handleChange}
                    placeholder="e.g. John"
                    className={`block w-full rounded-lg border ${errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-[var(--border)] focus:border-[var(--primary)]'} py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]`}
                  />
                  {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Last Name*
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={candidate.lastName}
                  onChange={handleChange}
                  placeholder="e.g. Doe"
                  className={`block w-full rounded-lg border ${errors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-[var(--border)] focus:border-[var(--primary)]'} py-3 px-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]`}
                />
                {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
              </div>
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Email Address*
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
                    value={candidate.email}
                    onChange={handleChange}
                    placeholder="e.g. john.doe@example.com"
                    className={`block w-full rounded-lg border ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-[var(--border)] focus:border-[var(--primary)]'} py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
              </div>
              
              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-[var(--muted-foreground)]" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={candidate.phone}
                    onChange={handleChange}
                    placeholder="e.g. +1 (555) 123-4567"
                    className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                  />
                </div>
              </div>
              
              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-[var(--muted-foreground)]" />
                  </div>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={candidate.location}
                    onChange={handleChange}
                    placeholder="e.g. New York, NY"
                    className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                  />
                </div>
              </div>
              
              {/* Position Applied For */}
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Position Applied For*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-[var(--muted-foreground)]" />
                  </div>
                  <input
                    id="position"
                    name="position"
                    type="text"
                    required
                    value={candidate.position}
                    onChange={handleChange}
                    placeholder="e.g. Frontend Developer"
                    className={`block w-full rounded-lg border ${errors.position ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-[var(--border)] focus:border-[var(--primary)]'} py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]`}
                  />
                  {errors.position && <p className="mt-1 text-xs text-red-500">{errors.position}</p>}
                </div>
              </div>
              
              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Status*
                </label>
                <select
                  id="status"
                  name="status"
                  required
                  value={candidate.status}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-[var(--border)] py-3 px-3 bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                >
                  <option value="New">New</option>
                  <option value="Screening">Screening</option>
                  <option value="Interview">Interview</option>
                  <option value="Assessment">Assessment</option>
                  <option value="Offer">Offer</option>
                  <option value="Hired">Hired</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              {/* Years of Experience */}
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Years of Experience
                </label>
                <input
                  id="experience"
                  name="experience"
                  type="text"
                  value={candidate.experience}
                  onChange={handleChange}
                  placeholder="e.g. 5 years"
                  className="block w-full rounded-lg border border-[var(--border)] py-3 px-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                />
              </div>
              
              {/* Education */}
              <div>
                <label htmlFor="education" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Education
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <GraduationCap className="h-5 w-5 text-[var(--muted-foreground)]" />
                  </div>
                  <input
                    id="education"
                    name="education"
                    type="text"
                    value={candidate.education}
                    onChange={handleChange}
                    placeholder="e.g. Bachelor's in Computer Science"
                    className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                  />
                </div>
              </div>
            </div>
            
            {/* Skills */}
            <div className="mb-6">
              <label htmlFor="skills" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                Skills
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Award className="h-5 w-5 text-[var(--muted-foreground)]" />
                </div>
                <input
                  id="skills"
                  name="skills"
                  type="text"
                  value={candidate.skills}
                  onChange={handleChange}
                  placeholder="e.g. JavaScript, React, Node.js"
                  className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                />
              </div>
            </div>
            
            {/* Resume Upload */}
            <div className="mb-6">
              <label htmlFor="resume" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                Resume/CV
              </label>
              <div className="flex items-center">
                <label className="flex flex-1 items-center justify-center border border-[var(--border)] border-dashed rounded-lg p-6 cursor-pointer bg-[var(--background)] hover:bg-[var(--secondary)] transition-colors">
                  <div className="text-center">
                    <FileText className="mx-auto h-12 w-12 text-[var(--muted-foreground)]" />
                    <div className="mt-2">
                      <p className="text-sm font-medium text-[var(--foreground)]">
                        {candidate.resume ? candidate.resume.name : "Click to upload or drag and drop"}
                      </p>
                      <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                        PDF, DOC, DOCX up to 10MB
                      </p>
                    </div>
                  </div>
                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
            
            {/* Notes */}
            <div className="mb-6">
              <label htmlFor="notes" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={candidate.notes}
                onChange={handleChange}
                rows={4}
                placeholder="Add any additional notes about the candidate..."
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
              Add Candidate
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}