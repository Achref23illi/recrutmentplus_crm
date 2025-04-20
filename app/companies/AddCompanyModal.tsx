// filepath: c:\Users\Achref\Projects\Big Projects\recruitmentplus_crm\app\companies\AddCompanyModal.tsx
'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Manufacturing',
  'Retail',
  'Hospitality',
  'Construction',
  'Real Estate',
  'Other'
]

const companyStatuses = [
  'Active',
  'Passive',
  'Lead',
  'Former Client',
  'Prospect'
]

interface AddCompanyModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (companyData: { 
    name: string; 
    website: string; 
    industry: string; 
    employeeCount: string; 
    status: string; 
    location: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    notes: string;
  }) => void
}

export function AddCompanyModal({ isOpen, onClose, onSubmit }: AddCompanyModalProps) {
  const [form, setForm] = useState({
    name: '',
    website: '',
    industry: industries[0],
    employeeCount: '',
    status: companyStatuses[0],
    location: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    notes: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
    setForm({
      name: '',
      website: '',
      industry: industries[0],
      employeeCount: '',
      status: companyStatuses[0],
      location: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      notes: ''
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Company" className="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">Company Name</label>
          <input
            title="Company Name"
            placeholder="Enter company name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
          />
        </div>

        {/* Website & Industry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Website</label>
            <input
              type="url"
              name="website"
              value={form.website}
              onChange={handleChange}
              title="Company Website"
              placeholder="e.g. https://example.com"
              className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Industry</label>
            <select
              name="industry"
              value={form.industry}
              onChange={handleChange}
              title="Industry"
              className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
            >
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Employee Count & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Number of Employees</label>
            <input
              type="text"
              name="employeeCount"
              value={form.employeeCount}
              onChange={handleChange}
              title="Employee Count"
              placeholder="e.g. 50-100"
              className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              title="Company Status"
              className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
            >
              {companyStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
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
            title="Company Location"
            placeholder="e.g. New York, NY, USA"
            className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
          />
        </div>

        {/* Primary Contact Information */}
        <div>
          <h4 className="font-medium text-neutral-200 mb-2">Primary Contact</h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Contact Name</label>
              <input
                type="text"
                name="contactName"
                value={form.contactName}
                onChange={handleChange}
                title="Contact Person Name"
                placeholder="Enter contact name"
                className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={form.contactEmail}
                onChange={handleChange}
                title="Contact Email"
                placeholder="Enter contact email"
                className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Contact Phone</label>
              <input
                type="tel"
                name="contactPhone"
                value={form.contactPhone}
                onChange={handleChange}
                title="Contact Phone"
                placeholder="Enter contact phone"
                className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            title="Company Notes"
            placeholder="Additional information about this company..."
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
            Save Company
          </button>
        </div>
      </form>
    </Modal>
  )
}