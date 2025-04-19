// app/analytics/page.jsx
'use client'

import KPICard from '../../components/KPICard'
import { BarChart3, LineChart, PieChart, ArrowRight, Download } from 'lucide-react'

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
    { label: 'Applications Received', value: 581, color: 'bg-[var(--primary)]' },
    { label: 'Initial Screening',      value: 324, color: 'bg-[var(--primary-light)]' },
    { label: 'Interviews Scheduled',   value: 105, color: 'bg-[var(--accent)]' },
    { label: 'Offers Extended',        value: 26,  color: 'bg-emerald-500'  },
  ]
  const maxPipeline = Math.max(...pipeline.map((p) => p.value))

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Analytics</h1>
          <button className="inline-flex items-center px-4 py-2 rounded-lg bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors">
            <Download className="mr-2 h-4 w-4" />
            <span>Export Data</span>
          </button>
        </div>
        <p className="text-[var(--muted-foreground)]">
          Track your recruitment metrics and optimize your hiring process.
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Positions */}
        <section className="bg-[var(--card)] p-6 rounded-lg shadow-soft border border-[var(--border)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-[var(--foreground)]">Top Positions</h2>
            <div className="bg-[var(--background)] rounded-md p-1">
              <BarChart3 className="h-5 w-5 text-[var(--primary)]" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  {['Position','Applications','Interviews','Hires','Progress'].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {topPositions.map((row) => {
                  const pct = Math.round((row.hires / row.applications) * 100)
                  return (
                    <tr key={row.position} className="hover:bg-[var(--muted)]">
                      <td className="px-4 py-3 text-sm font-medium text-[var(--foreground)]">{row.position}</td>
                      <td className="px-4 py-3 text-sm text-[var(--foreground)]">{row.applications}</td>
                      <td className="px-4 py-3 text-sm text-[var(--foreground)]">{row.interviews}</td>
                      <td className="px-4 py-3 text-sm text-[var(--foreground)]">{row.hires}</td>
                      <td className="px-4 py-3 w-36">
                        <div className="w-full bg-[var(--secondary)] rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-[var(--primary)]"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <div className="text-xs text-[var(--muted-foreground)] mt-1 text-right">
                          {pct}%
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <button className="flex items-center text-[var(--primary)] hover:text-[var(--primary-light)] transition-colors text-sm">
              <span>View All Positions</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </section>

        {/* Hiring Pipeline */}
        <section className="bg-[var(--card)] p-6 rounded-lg shadow-soft border border-[var(--border)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-[var(--foreground)]">Hiring Pipeline</h2>
            <div className="bg-[var(--background)] rounded-md p-1">
              <LineChart className="h-5 w-5 text-[var(--primary)]" />
            </div>
          </div>
          
          <div className="space-y-5">
            {pipeline.map((item) => {
              const widthPct = Math.round((item.value / maxPipeline) * 100)
              return (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-[var(--foreground)]">{item.label}</span>
                    <span className="text-[var(--foreground)]">{item.value}</span>
                  </div>
                  <div className="w-full h-3 bg-[var(--secondary)] rounded-full overflow-hidden">
                    <div
                      className={`${item.color} h-3 rounded-full shadow-inner`}
                      style={{ width: `${widthPct}%` }}
                    >
                      <div className="h-full bg-opacity-20 bg-white"></div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Additional stats */}
          <div className="mt-6 pt-6 border-t border-[var(--border)] grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-[var(--background)] rounded-lg">
              <div className="text-3xl font-semibold text-[var(--primary)]">87%</div>
              <div className="text-xs text-[var(--muted-foreground)] mt-1">Offer Acceptance</div>
            </div>
            <div className="text-center p-3 bg-[var(--background)] rounded-lg">
              <div className="text-3xl font-semibold text-[var(--primary)]">16</div>
              <div className="text-xs text-[var(--muted-foreground)] mt-1">Avg. Days to Fill</div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Source Distribution */}
      <section className="bg-[var(--card)] p-6 rounded-lg shadow-soft border border-[var(--border)]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-[var(--foreground)]">Candidate Source Distribution</h2>
          <div className="bg-[var(--background)] rounded-md p-1">
            <PieChart className="h-5 w-5 text-[var(--primary)]" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: 'Job Boards', value: '32%', color: 'bg-[var(--primary)]' },
            { label: 'Referrals', value: '27%', color: 'bg-[var(--primary-light)]' },
            { label: 'Social Media', value: '18%', color: 'bg-[var(--accent)]' },
            { label: 'Company Website', value: '15%', color: 'bg-amber-400' },
            { label: 'Recruitment Agencies', value: '8%', color: 'bg-emerald-500' },
          ].map(item => (
            <div key={item.label} className="text-center p-4 bg-[var(--background)] rounded-lg border border-[var(--border)] shadow-soft">
              <div className="w-8 h-8 rounded-full mx-auto mb-2" style={{ background: `var(--${item.color.split('-')[1]})` }}></div>
              <div className="text-xl font-semibold text-[var(--foreground)]">{item.value}</div>
              <div className="text-xs text-[var(--muted-foreground)] mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
