// app/calendar/page.tsx
'use client'

import { Plus } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      {/* Header + New Event button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Calendar</h2>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus className="mr-2" size={16} /> New Event
        </button>
      </div>

      {/* Calendar placeholder */}
      <Card className="h-[600px]">
        <p className="text-gray-500">[Monthly calendar grid will go here]</p>
      </Card>
    </div>
  )
}
