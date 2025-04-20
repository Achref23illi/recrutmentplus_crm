// app/settings/page.tsx
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'

export default function SettingsPage() {
  const [companyName, setCompanyName] = useState('RecrutementPlus')
  const [timeZone, setTimeZone] = useState('Africa/Algiers')
  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif, setPushNotif] = useState(false)

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800">Settings</h2>

      <Card>
        <div className="space-y-4">
          {/* Company Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              placeholder="Enter your company name"
              className="mt-1 block w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Time Zone */}
          <div>
            <label htmlFor="timeZone" className="block text-sm font-medium text-gray-700">Time Zone</label>
            <select
              id="timeZone"
              value={timeZone}
              onChange={e => setTimeZone(e.target.value)}
              className="mt-1 block w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Africa/Algiers">Africa/Algiers</option>
              <option value="Europe/London">Europe/London</option>
              <option value="America/New_York">America/New_York</option>
              <option value="Asia/Dubai">Asia/Dubai</option>
            </select>
          </div>

          {/* Notifications */}
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotif}
                onChange={e => setEmailNotif(e.target.checked)}
                className="mr-2"
              />
              Email Notifications
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={pushNotif}
                onChange={e => setPushNotif(e.target.checked)}
                className="mr-2"
              />
              Push Notifications
            </label>
          </div>
        </div>
      </Card>
    </div>
  )
}
