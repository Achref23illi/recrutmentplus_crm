// app/companies/new/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'

export default function NewCompanyPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    industry: '',
    website: '',
    contactEmail: '',
    notes: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: call API to create company
    console.log('Creating company:', form)
    router.push('/companies')
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Company</h2>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter company name"
              className="mt-1 block w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Industry & Website */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Industry</label>
              <input
                type="text"
                name="industry"
                value={form.industry}
                onChange={handleChange}
                placeholder="Enter industry"
                className="mt-1 block w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <input
                type="url"
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="Enter company website"
                className="mt-1 block w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Contact Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={form.contactEmail}
              onChange={handleChange}
              required
              placeholder="Enter contact email"
              className="mt-1 block w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Enter any notes about the company"
              className="mt-1 block w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save Company
            </button>
          </div>
        </form>
      </Card>
    </div>
  )
}
