// app/companies/new/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

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
      {/* Page heading with back button */}
      <div className="mb-6 flex items-center">
        <Link href="/companies" className="mr-4 p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800">
          <ChevronLeft size={20} />
        </Link>
        <h2 className="text-2xl font-semibold text-[#80BDCA]">Add Company</h2>
      </div>

      <Card className="bg-neutral-800 border border-neutral-700 shadow-sm">
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Company Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter company name"
              className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F] focus:border-transparent"
            />
          </div>

          {/* Industry & Website */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Industry</label>
              <input
                type="text"
                name="industry"
                value={form.industry}
                onChange={handleChange}
                placeholder="Enter industry"
                className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Website</label>
              <input
                type="url"
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="Enter company website"
                className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F] focus:border-transparent"
              />
            </div>
          </div>

          {/* Contact Email */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={form.contactEmail}
              onChange={handleChange}
              required
              placeholder="Enter contact email"
              className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F] focus:border-transparent"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Enter any notes about the company"
              className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F] focus:border-transparent"
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Link
              href="/companies"
              className="px-4 py-2 border border-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-700 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2 bg-[#1D4E5F] text-white rounded-lg hover:bg-[#123040] transition"
            >
              Save Company
            </button>
          </div>
        </form>
      </Card>
    </div>
  )
}