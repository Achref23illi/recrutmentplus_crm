// filepath: app/calendar/AddEventModal.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

  // Animation variants
  // const overlayVariants = {
  //   hidden: { opacity: 0 },
  //   visible: { opacity: 1 }
  // }

  // const modalVariants = {
  //   hidden: { 
  //     opacity: 0, 
  //     y: 20,
  //     scale: 0.95
  //   },
  //   visible: { 
  //     opacity: 1, 
  //     y: 0,
  //     scale: 1,
  //     transition: { 
  //       type: "spring", 
  //       damping: 25, 
  //       stiffness: 300 
  //     }
  //   },
  //   exit: { 
  //     opacity: 0, 
  //     y: 20,
  //     scale: 0.95,
  //     transition: { duration: 0.2 }
  //   }
  // }

  const inputVariants = {
    focus: { scale: 1.02, borderColor: "#1D4E5F", boxShadow: "0 0 0 2px rgba(29, 78, 95, 0.3)" },
    blur: { scale: 1, borderColor: "#404040" }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07
      }
    }
  }

  const fadeInUp = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Event" className="max-w-2xl">
          <motion.div
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={staggerContainer}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Event Title */}
              <motion.div variants={fadeInUp}>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Event Title</label>
                <motion.input
                  whileFocus="focus"
                  initial="blur"
                  animate="blur"
                  variants={inputVariants}
                  title="Event Title"
                  placeholder="Enter event title"
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none"
                />
              </motion.div>

              {/* Event Type & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Event Type</label>
                  <motion.select
                    whileFocus="focus"
                    initial="blur"
                    animate="blur"
                    variants={inputVariants}
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    title="Event Type"
                    className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none"
                  >
                    {eventTypes.map(type => (
                      <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                    ))}
                  </motion.select>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Date</label>
                  <motion.input
                    whileFocus="focus"
                    initial="blur"
                    animate="blur"
                    variants={inputVariants}
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    title="Event Date"
                    required
                    className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none"
                  />
                </motion.div>
              </div>

              {/* Time & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Start Time</label>
                  <motion.input
                    whileFocus="focus"
                    initial="blur"
                    animate="blur"
                    variants={inputVariants}
                    type="time"
                    name="startTime"
                    value={form.startTime}
                    onChange={handleChange}
                    title="Start Time"
                    required
                    className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none"
                  />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Duration (minutes)</label>
                  <motion.select
                    whileFocus="focus"
                    initial="blur"
                    animate="blur"
                    variants={inputVariants}
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    title="Event Duration"
                    className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none"
                  >
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={90}>1.5 hours</option>
                    <option value={120}>2 hours</option>
                  </motion.select>
                </motion.div>
              </div>

              {/* Location */}
              <motion.div variants={fadeInUp}>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Location</label>
                <motion.input
                  whileFocus="focus"
                  initial="blur"
                  animate="blur"
                  variants={inputVariants}
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  title="Event Location"
                  placeholder="e.g. Conference Room A, Zoom Meeting, etc."
                  className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none"
                />
              </motion.div>

              {/* Attendees */}
              <motion.div variants={fadeInUp}>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Attendees (email addresses, comma-separated)</label>
                <motion.input
                  whileFocus="focus"
                  initial="blur"
                  animate="blur"
                  variants={inputVariants}
                  type="text"
                  name="attendees"
                  value={form.attendees}
                  onChange={handleChange}
                  title="Event Attendees"
                  placeholder="e.g. john@example.com, sarah@example.com"
                  className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none"
                />
              </motion.div>

              {/* Description */}
              <motion.div variants={fadeInUp}>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Description</label>
                <motion.textarea
                  whileFocus="focus"
                  initial="blur"
                  animate="blur"
                  variants={inputVariants}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  title="Event Description"
                  placeholder="Add event details..."
                  className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none"
                />
              </motion.div>

              {/* Action buttons */}
              <motion.div variants={fadeInUp} className="flex justify-end gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-700 transition"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-6 py-2 bg-[#1D4E5F] text-white rounded-lg hover:bg-[#123040] transition"
                >
                  Add Event
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  )
}