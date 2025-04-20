// filepath: c:\Users\Achref\Projects\Big Projects\recruitmentplus_crm\app\automation\logs\page.tsx
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock, 
  ArrowLeft, 
  Search, 
  Filter,
  Download,
  Calendar 
} from 'lucide-react'
import Link from 'next/link'

// Types for the activity logs
interface ActivityLog {
  id: string
  workflowId: string
  workflowName: string
  status: 'success' | 'failure' | 'warning' | 'pending'
  message: string
  details?: string
  timestamp: string
  duration?: number
  trigger: string
}

// Sample activity log data
const sampleActivityLogs: ActivityLog[] = [
  {
    id: 'log1',
    workflowId: 'wf1',
    workflowName: 'New Application Notification',
    status: 'success',
    message: 'Email sent successfully',
    details: 'Email notification sent to hr@company.com for candidate John Doe',
    timestamp: '2025-04-20 09:15:22',
    duration: 1.2,
    trigger: 'New application received'
  },
  {
    id: 'log2',
    workflowId: 'wf3',
    workflowName: 'Client Follow-Up',
    status: 'success',
    message: 'Reminder email sent',
    details: 'Follow-up email sent to client@acme.com regarding candidate Sarah Smith',
    timestamp: '2025-04-19 14:30:45',
    duration: 2.1,
    trigger: 'Candidate in "Client Review" for 7 days'
  },
  {
    id: 'log3',
    workflowId: 'wf5',
    workflowName: 'Candidate Onboarding',
    status: 'failure',
    message: 'Failed to send onboarding materials',
    details: 'Error: SMTP connection failed. Email server unreachable.',
    timestamp: '2025-04-18 16:45:12',
    duration: 5.3,
    trigger: 'Candidate status changed to "Hired"'
  },
  {
    id: 'log4',
    workflowId: 'wf1',
    workflowName: 'New Application Notification',
    status: 'success',
    message: 'Email sent successfully',
    details: 'Email notification sent to hr@company.com for candidate Emma Johnson',
    timestamp: '2025-04-18 11:22:38',
    duration: 0.9,
    trigger: 'New application received'
  },
  {
    id: 'log5',
    workflowId: 'wf3',
    workflowName: 'Client Follow-Up',
    status: 'warning',
    message: 'Email sent but delivery delayed',
    details: 'Email server reported delays, message queued for delivery',
    timestamp: '2025-04-17 10:05:33',
    duration: 4.2,
    trigger: 'Candidate in "Client Review" for 7 days'
  },
  {
    id: 'log6',
    workflowId: 'wf5',
    workflowName: 'Candidate Onboarding',
    status: 'success',
    message: 'Onboarding materials sent',
    details: 'Welcome email and documents sent to michael.brown@example.com',
    timestamp: '2025-04-15 09:30:27',
    duration: 2.8,
    trigger: 'Candidate status changed to "Hired"'
  },
  {
    id: 'log7',
    workflowId: 'wf1',
    workflowName: 'New Application Notification',
    status: 'success',
    message: 'Email sent successfully',
    details: 'Email notification sent to hr@company.com for candidate Robert Wilson',
    timestamp: '2025-04-14 16:15:42',
    duration: 1.0,
    trigger: 'New application received'
  },
  {
    id: 'log8',
    workflowId: 'wf3',
    workflowName: 'Client Follow-Up',
    status: 'pending',
    message: 'Email scheduled for delivery',
    details: 'Follow-up email scheduled for delivery at 9:00 AM tomorrow',
    timestamp: '2025-04-14 15:30:11',
    duration: 0.5,
    trigger: 'Manual trigger by user'
  }
]

export default function AutomationLogsPage() {
  const [logs] = useState<ActivityLog[]>(sampleActivityLogs)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Filter logs based on search query
  const filteredLogs = logs.filter(log => 
    log.workflowName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.details?.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  // Status icon renderer
  const renderStatusIcon = (status: string) => {
    switch(status) {
      case 'success':
        return <CheckCircle size={18} className="text-green-400" />;
      case 'failure':
        return <XCircle size={18} className="text-red-400" />;
      case 'warning':
        return <AlertCircle size={18} className="text-amber-400" />;
      case 'pending':
        return <Clock size={18} className="text-blue-400" />;
      default:
        return <AlertCircle size={18} className="text-neutral-400" />;
    }
  }
  
  // Format duration in seconds to a readable format
  const formatDuration = (seconds?: number): string => {
    if (!seconds) return 'N/A';
    if (seconds < 1) return `${(seconds * 1000).toFixed(0)} ms`;
    return `${seconds.toFixed(1)} s`;
  }

  return (
    <div className="space-y-8">
      {/* Page Title and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <Link href="/automation" className="p-2 -ml-2 text-neutral-400 hover:text-white mr-2">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-2xl font-semibold text-[#80BDCA]">Activity Logs</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search logs..."
              className="pl-10 pr-4 py-2 w-64 border border-neutral-700 bg-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
            />
          </div>
          <div className="inline-flex items-center px-3 py-2 bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-700">
            <Calendar size={16} className="mr-2" /> Last 7 days
          </div>
          <button className="inline-flex items-center px-3 py-2 bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-700">
            <Filter size={18} className="mr-2" /> Filter
          </button>
          <button className="inline-flex items-center px-3 py-2 bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-700">
            <Download size={18} className="mr-2" /> Export
          </button>
        </div>
      </div>

      {/* Activity Logs */}
      <Card className="bg-neutral-800 border border-neutral-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-neutral-700/30 border-b border-neutral-700">
                <th className="px-6 py-3 text-sm font-medium text-neutral-300">Status</th>
                <th className="px-6 py-3 text-sm font-medium text-neutral-300">Workflow</th>
                <th className="px-6 py-3 text-sm font-medium text-neutral-300">Message</th>
                <th className="px-6 py-3 text-sm font-medium text-neutral-300">Trigger</th>
                <th className="px-6 py-3 text-sm font-medium text-neutral-300">Timestamp</th>
                <th className="px-6 py-3 text-sm font-medium text-neutral-300 text-right">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700">
              {filteredLogs.map(log => (
                <tr 
                  key={log.id} 
                  className="hover:bg-neutral-700/20 group cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {renderStatusIcon(log.status)}
                      <span className="ml-2 text-sm capitalize text-neutral-300">
                        {log.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-white font-medium">{log.workflowName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-neutral-300">{log.message}</span>
                      {log.details && (
                        <span className="text-xs text-neutral-500 mt-1 max-w-xs truncate">{log.details}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-neutral-400">{log.trigger}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-neutral-400">{log.timestamp}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`text-sm ${
                      log.duration && log.duration > 3 ? 'text-yellow-400' : 'text-neutral-400'
                    }`}>
                      {formatDuration(log.duration)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty state */}
        {filteredLogs.length === 0 && (
          <div className="py-12 flex flex-col items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-neutral-700/20 flex items-center justify-center mb-4">
              <AlertCircle size={32} className="text-neutral-500" />
            </div>
            <h3 className="text-neutral-300 font-medium text-lg">No matching logs found</h3>
            <p className="text-neutral-500 mt-2 text-center max-w-md">
              Try adjusting your search query or filters to find what you&apos;re looking for.
            </p>
          </div>
        )}
        
        {/* Pagination */}
        {filteredLogs.length > 0 && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-neutral-700 bg-neutral-800">
            <div className="text-sm text-neutral-400">
              Showing {filteredLogs.length} of {logs.length} logs
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-neutral-700 rounded text-sm text-neutral-400 hover:bg-neutral-700 disabled:opacity-50 disabled:hover:bg-transparent" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border border-neutral-700 rounded bg-[#1D4E5F] text-white text-sm hover:bg-[#123040]">
                1
              </button>
              <button className="px-3 py-1 border border-neutral-700 rounded text-sm text-neutral-400 hover:bg-neutral-700">
                Next
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}