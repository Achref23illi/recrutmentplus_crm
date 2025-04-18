'use client'

import { useState } from 'react'
import { Save } from 'lucide-react'
import Toggle from '../../components/Toggle'

export default function SettingsPage() {
  // State hooks
  const [companyName, setCompanyName] = useState('RecrutementPlus')
  const [timezone, setTimezone] = useState('UTC+1')
  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif, setPushNotif] = useState(false)
  const [jobDuration, setJobDuration] = useState(30)
  const [twoFA, setTwoFA] = useState(false)

  const handleSave = () => {
    // TODO: persist these settings via your API
    console.log({
      companyName,
      timezone,
      emailNotif,
      pushNotif,
      jobDuration,
      twoFA,
    })
    alert('Settings saved!')
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

      {/* Company Info */}
      <section className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Company Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time Zone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
            >
              <option>UTC-12</option>
              <option>UTC-8</option>
              <option>UTC</option>
              <option>UTC+1</option>
              <option>UTC+2</option>
              <option>UTC+5:30</option>
              <option>UTC+10</option>
            </select>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Email Notifications</span>
          <Toggle enabled={emailNotif} onChange={setEmailNotif} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Push Notifications</span>
          <Toggle enabled={pushNotif} onChange={setPushNotif} />
        </div>
      </section>

      {/* Job Posting Defaults */}
      <section className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Job Posting Defaults</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Default Posting Duration (days)
          </label>
          <input
            type="number"
            min="1"
            value={jobDuration}
            onChange={(e) => setJobDuration(Number(e.target.value))}
            className="mt-1 block w-32 px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
      </section>

      {/* Security */}
      <section className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Security</h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Two‑Factor Authentication</span>
          <Toggle enabled={twoFA} onChange={setTwoFA} />
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Save className="w-5 h-5 mr-2" />
          Save Settings
        </button>
      </div>
    </div>
  )
}
