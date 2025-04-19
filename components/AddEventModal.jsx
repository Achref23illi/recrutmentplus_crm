// components/AddEventModal.jsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Calendar, Clock, MapPin, Users, AlignLeft, Calendar as CalendarIcon } from 'lucide-react'

export default function AddEventModal({ isOpen, onClose }) {
  const [event, setEvent] = useState({
    title: '',
    type: 'interview',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    attendees: '',
    description: ''
  })

  const modalRef = useRef(null)
  const initialFocusRef = useRef(null)

  // Format today's date as YYYY-MM-DD for default date
  const today = new Date()
  const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  // Set today as default date when modal opens
  useEffect(() => {
    if (isOpen) {
      setEvent(prev => ({
        ...prev,
        date: formattedToday
      }))
    }
  }, [isOpen, formattedToday])

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
    setEvent(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Create JS Date objects from form inputs
    const [year, month, day] = event.date.split('-').map(Number)
    const [startHours, startMinutes] = event.startTime.split(':').map(Number)
    const [endHours, endMinutes] = event.endTime.split(':').map(Number)
    
    const startDate = new Date(year, month - 1, day, startHours, startMinutes)
    const endDate = new Date(year, month - 1, day, endHours, endMinutes)
    
    // Format the attendees as an array
    const attendeesArray = event.attendees.split(',').map(attendee => attendee.trim()).filter(Boolean)
    
    const newEvent = {
      id: Date.now(), // Generate a unique ID based on timestamp
      title: event.title,
      date: startDate,
      endDate: endDate,
      type: event.type,
      location: event.location,
      attendees: attendeesArray,
      description: event.description
    }
    
    // Pass the new event back to the parent component
    onClose(newEvent)
    
    // Reset form
    setEvent({
      title: '',
      type: 'interview',
      date: formattedToday,
      startTime: '',
      endTime: '',
      location: '',
      attendees: '',
      description: ''
    })
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
              <CalendarIcon className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold text-[var(--foreground)]">Add Calendar Event</h2>
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
              {/* Event Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Event Title*
                </label>
                <input
                  ref={initialFocusRef}
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={event.title}
                  onChange={handleChange}
                  placeholder="e.g. Interview with John Smith"
                  className="block w-full rounded-lg border border-[var(--border)] py-3 px-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                />
              </div>
              
              {/* Event Type */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Event Type*
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  value={event.type}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-[var(--border)] py-3 px-3 bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                >
                  <option value="interview">Interview</option>
                  <option value="meeting">Meeting</option>
                  <option value="call">Call</option>
                  <option value="task">Task</option>
                </select>
              </div>
              
              {/* Date & Time Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                    Date*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-[var(--muted-foreground)]" />
                    </div>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      required
                      value={event.date}
                      onChange={handleChange}
                      className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                    Start Time*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-[var(--muted-foreground)]" />
                    </div>
                    <input
                      id="startTime"
                      name="startTime"
                      type="time"
                      required
                      value={event.startTime}
                      onChange={handleChange}
                      className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                    End Time*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-[var(--muted-foreground)]" />
                    </div>
                    <input
                      id="endTime"
                      name="endTime"
                      type="time"
                      required
                      value={event.endTime}
                      onChange={handleChange}
                      className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                    />
                  </div>
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
                    value={event.location}
                    onChange={handleChange}
                    placeholder="e.g. Conference Room A, Zoom, Phone"
                    className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                  />
                </div>
              </div>
              
              {/* Attendees */}
              <div>
                <label htmlFor="attendees" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Attendees* <span className="text-xs text-[var(--muted-foreground)]">(comma-separated)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-[var(--muted-foreground)]" />
                  </div>
                  <input
                    id="attendees"
                    name="attendees"
                    type="text"
                    required
                    value={event.attendees}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Johnson, John Smith"
                    className="block w-full rounded-lg border border-[var(--border)] py-3 pl-10 pr-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                  />
                </div>
              </div>
              
              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Description
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <AlignLeft className="h-5 w-5 text-[var(--muted-foreground)]" />
                  </div>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    value={event.description}
                    onChange={handleChange}
                    placeholder="Add details about the event..."
                    className="block w-full rounded-lg border border-[var(--border)] py-3 px-3 pl-10 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
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
              Add to Calendar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}