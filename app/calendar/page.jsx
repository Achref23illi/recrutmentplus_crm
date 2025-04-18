// app/calendar/page.jsx
'use client'

import { CalendarPlus } from 'lucide-react'

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const times = Array.from({ length: 11 }, (_, i) => `${8 + i}:00`)

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <CalendarPlus className="w-5 h-5 mr-2" />
          New Event
        </button>
      </div>

      {/* Calendar grid */}
      <div className="overflow-auto bg-white rounded-lg shadow">
        <table className="min-w-full border-separate border-spacing-0">
          <thead className="bg-gray-50">
            <tr>
              {/* top‑left empty */}
              <th className="w-24 p-2 border-b border-gray-200"></th>
              {days.map((d) => (
                <th
                  key={d}
                  className="p-2 text-center text-sm font-medium text-gray-500 border-b border-gray-200"
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {times.map((t) => (
              <tr key={t} className="h-16">
                {/* time column */}
                <td className="p-2 text-xs text-gray-500 border-r border-gray-200">
                  {t}
                </td>

                {/* empty slots */}
                {days.map((_, idx) => (
                  <td
                    key={idx}
                    className="p-1 border-b border-r border-gray-100"
                  >
                    {/* you can render events here */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
