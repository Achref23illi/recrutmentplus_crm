// components/KPICard.jsx
'use client'

import { ArrowUp, ArrowDown } from 'lucide-react'

export default function KPICard({ title, value, change, trend }) {
  const isUp = trend === 'up'

  return (
    <div className="bg-[var(--card)] p-6 rounded-lg shadow-soft border border-[var(--border)] hover:shadow-medium transition-shadow duration-300 flex-1">
      <h3 className="text-sm font-medium text-[var(--muted-foreground)]">{title}</h3>
      <div className="mt-3 flex items-baseline space-x-2">
        <span className="text-3xl font-semibold text-[var(--foreground)]">{value}</span>
        <span className={`flex items-center text-sm font-medium ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
          {isUp ? <ArrowUp className="h-4 w-4 mr-0.5" /> : <ArrowDown className="h-4 w-4 mr-0.5" />}
          {change}
        </span>
      </div>
      <div className="mt-4 h-1.5 w-full bg-[var(--secondary)] rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${isUp ? 'bg-emerald-500' : 'bg-rose-500'}`} 
          style={{ width: `${parseInt(change) || 30}%` }}
        />
      </div>
    </div>
  )
}
