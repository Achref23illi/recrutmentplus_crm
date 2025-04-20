// components/candidates/AddCandidateModal.tsx
'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'

const stages = [
  'Received',
  'Interview Scheduled',
  'Interview Completed',
  'Client Waiting',
]

const statuses = [
  'New',
  'In Progress',
  'Pending',
  'Hired',
  'Rejected',
]

interface AddCandidateModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (candidateData: { name: string; email: string; phone: string; stage: string; status: string; skills: string; resume: File | null }) => void
}

export function AddCandidateModal({ isOpen, onClose, onSubmit }: AddCandidateModalProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    stage: stages[0],
    status: statuses[0],
    skills: '',
    resume: null as File | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement & { files: FileList }
    if (name === 'resume') {
      setForm(f => ({ ...f, resume: files?.[0] || null }))
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
    setForm({
      name: '',
      email: '',
      phone: '',
      stage: stages[0],
      status: statuses[0],
      skills: '',
      resume: null,
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Candidate" className="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">Full Name</label>
          <input
            title="Full Name"
            placeholder="Enter full name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
          />
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              title="Email Address"
              placeholder="Enter email address"
              className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              title="Phone Number"
              placeholder="Enter phone number"
              className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
            />
          </div>
        </div>

        {/* Stage & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Stage</label>
            <select
              name="stage"
              value={form.stage}
              onChange={handleChange}
              title="Candidate Stage"
              className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
            >
              {stages.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              title="Candidate Status"
              className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
            >
              {statuses.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">Skills (comma‑separated)</label>
          <input
            type="text"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="e.g. JavaScript, React, Node.js"
            className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
          />
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">Resume (PDF)</label>
          <input
            type="file"
            name="resume"
            accept=".pdf"
            onChange={handleChange}
            title="Upload Resume"
            className="w-full text-neutral-300 file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0 file:bg-neutral-700 file:text-white
                     hover:file:bg-neutral-600 file:text-sm"
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
            Save Candidate
          </button>
        </div>
      </form>
    </Modal>
  )
}