// components/KPICard.jsx
'use client'

import { ArrowUp, ArrowDown } from 'lucide-react'

export default function KPICard({ title, value, change, trend }) {
  const isUp = trend === 'up'

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm flex-1">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline space-x-2">
        <span className="text-2xl font-semibold text-gray-900">{value}</span>
        <span className={`flex items-center text-sm font-medium ${isUp ? 'text-green-500' : 'text-red-500'}`}>
          {isUp ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
          {change}
        </span>
      </div>
    </div>
  )
}
