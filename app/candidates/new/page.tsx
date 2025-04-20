// app/candidates/new/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'

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

export default function NewCandidatePage() {
  const router = useRouter()
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
      setForm(f => ({ ...f, resume: files[0] }))
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: call API to create candidate
    console.log('Submitting candidate:', form)
    router.push('/candidates')
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Candidate</h2>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              title="Full Name"
              placeholder="Enter full name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                title="Email Address"
                placeholder="Enter email address"
                className="mt-1 block w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                title="Phone Number"
                placeholder="Enter phone number"
                className="mt-1 block w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Stage & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Stage</label>
              <select
                name="stage"
                value={form.stage}
                onChange={handleChange}
                title="Candidate Stage"
                className="mt-1 block w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {stages.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                title="Candidate Status"
                className="mt-1 block w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statuses.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Skills (comma‑separated)</label>
            <input
              type="text"
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="e.g. JavaScript, React, Node.js"
              className="mt-1 block w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Resume (PDF)</label>
            <input
              type="file"
              name="resume"
              accept=".pdf"
              onChange={handleChange}
              title="Upload Resume"
              placeholder="Choose a PDF file"
              className="mt-1 block w-full text-gray-700"
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save Candidate
            </button>
          </div>
        </form>
      </Card>
    </div>
  )
}
