// app/page.jsx
import KPICard from '../components/KPICard'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900">Recruitment Dashboard</h1>

      {/* KPI Row */}
      <div className="flex gap-6">
        <KPICard title="Active Candidates" value="145" change="23.36%" trend="up" />
        <KPICard title="Open Positions"   value="37"  change="12.05%" trend="up" />
        <KPICard title="Placements"       value="24"  change="28.12%" trend="up" />
        <KPICard title="Time to Hire"     value="18.5 days" change="4.3%" trend="down" />
      </div>

      {/* TODO: add Kanban pipeline here */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Pipeline</h2>
        {/* Placeholder for Kanban component */}
        <div className="h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
          Kanban Pipeline coming soon…
        </div>
      </div>
    </div>
  )
}
