// filepath: c:\Users\Achref\Projects\Big Projects\recruitmentplus_crm\app\calendar\AddEventModal.tsx
'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'

const eventTypes = [
  'interview',
  'meeting',
  'screening',
  'internal',
  'followup'
]

interface AddEventModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (eventData: { 
    title: string; 
    type: string; 
    date: string; 
    startTime: string;
    duration: number;
    description: string;
    attendees: string;
    location: string;
  }) => void
}

export function AddEventModal({ isOpen, onClose, onSubmit }: AddEventModalProps) {
  const [form, setForm] = useState({
    title: '',
    type: eventTypes[0],
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    duration: 30,
    description: '',
    attendees: '',
    location: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
    setForm({
      title: '',
      type: eventTypes[0],
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      duration: 30,
      description: '',
      attendees: '',
      location: '',
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Event" className="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Event Title */}
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">Event Title</label>
          <input
            title="Event Title"
            placeholder="Enter event title"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
          />
        </div>

        {/* Event Type & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Event Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              title="Event Type"
              className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
            >
              {eventTypes.map(type => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              title="Event Date"
              required
              className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
            />
          </div>
        </div>

        {/* Time & Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              title="Start Time"
              required
              className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Duration (minutes)</label>
            <select
              name="duration"
              value={form.duration}
              onChange={handleChange}
              title="Event Duration"
              className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>1 hour</option>
              <option value={90}>1.5 hours</option>
              <option value={120}>2 hours</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            title="Event Location"
            placeholder="e.g. Conference Room A, Zoom Meeting, etc."
            className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
          />
        </div>

        {/* Attendees */}
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">Attendees (email addresses, comma-separated)</label>
          <input
            type="text"
            name="attendees"
            value={form.attendees}
            onChange={handleChange}
            title="Event Attendees"
            placeholder="e.g. john@example.com, sarah@example.com"
            className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            title="Event Description"
            placeholder="Add event details..."
            className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-700 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#1D4E5F] text-white rounded-lg hover:bg-[#123040] transition"
          >
            Add Event
          </button>
        </div>
      </form>
    </Modal>
  )
}