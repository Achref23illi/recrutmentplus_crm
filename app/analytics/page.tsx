// app/analytics/page.tsx
'use client'

import { Card } from '@/components/ui/card'

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-800">Analytics</h2>

      {/* KPI summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <p className="text-sm text-gray-500">Total Candidates</p>
          <p className="text-xl font-semibold">256</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Time to Hire (avg)</p>
          <p className="text-xl font-semibold">30 days</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Hires</p>
          <p className="text-xl font-semibold">143</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Rejections</p>
          <p className="text-xl font-semibold">58</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-80 flex items-center justify-center">
          <p className="text-gray-500">[Top Positions Chart]</p>
        </Card>
        <Card className="h-80 flex items-center justify-center">
          <p className="text-gray-500">[Hiring Pipeline Chart]</p>
        </Card>
      </div>
    </div>
  )
}
