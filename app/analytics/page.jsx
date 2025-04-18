// app/analytics/page.jsx
'use client'

import KPICard from '../../components/KPICard'

export default function AnalyticsPage() {
  // KPI data
  const kpis = [
    { title: 'Total Candidates',   value: '1,234',    change: '12.5%',  trend: 'up'   },
    { title: 'Time to Hire',       value: '18.5 days', change: '4.3%',   trend: 'down' },
    { title: 'Successful Hires',   value: '156',      change: '28.12%', trend: 'up'   },
    { title: 'Rejected Candidates',value: '432',      change: '15.8%',  trend: 'down' },
  ]

  // Top positions data
  const topPositions = [
    { position: 'Frontend Developer', applications: 245, interviews: 45, hires: 12 },
    { position: 'Product Manager',     applications: 180, interviews: 32, hires: 8  },
    { position: 'UX Designer',         applications: 156, interviews: 28, hires: 6  },
  ]

  // Hiring pipeline data
  const pipeline = [
    { label: 'Applications Received', value: 581, color: 'bg-blue-500'   },
    { label: 'Initial Screening',      value: 324, color: 'bg-purple-500' },
    { label: 'Interviews Scheduled',   value: 105, color: 'bg-orange-500' },
    { label: 'Offers Extended',        value: 26,  color: 'bg-green-500'  },
  ]
  const maxPipeline = Math.max(...pipeline.map((p) => p.value))

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>

      {/* KPI Row */}
      <div className="flex flex-wrap gap-6">
        {kpis.map((k) => (
          <KPICard
            key={k.title}
            title={k.title}
            value={k.value}
            change={k.change}
            trend={k.trend}
          />
        ))}
      </div>

      {/* Content Panels */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Top Positions */}
        <section className="flex-1 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Positions</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Position','Applications','Interviews','Hires','Progress'].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topPositions.map((row) => {
                const pct = Math.round((row.hires / row.applications) * 100)
                return (
                  <tr key={row.position}>
                    <td className="px-4 py-3 text-sm text-gray-900">{row.position}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{row.applications}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{row.interviews}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{row.hires}</td>
                    <td className="px-4 py-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>

        {/* Hiring Pipeline */}
        <section className="flex-1 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Hiring Pipeline</h2>
          <div className="space-y-4">
            {pipeline.map((item) => {
              const widthPct = Math.round((item.value / maxPipeline) * 100)
              return (
                <div key={item.label}>
                  <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                    <span>{item.label}</span>
                    <span className="text-gray-900">{item.value}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full`}
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
