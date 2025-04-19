// components/TeamMemberCard.jsx
'use client'

import { MessageCircle, MoreVertical, Phone, Mail, UserPlus } from 'lucide-react'

export default function TeamMemberCard({ member }) {
  // Calculate completion percentage
  const completionPercentage = Math.round((member.completed / member.assigned) * 100) || 0;

  return (
    <div className="bg-[var(--card)] p-5 rounded-lg border border-[var(--border)] shadow-soft hover:shadow-medium transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          {member.avatar ? (
            <img
              src={member.avatar}
              alt={member.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[var(--primary)] shadow-sm"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center font-medium text-lg shadow-sm">
              {member.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
          <div>
            <div className="text-[var(--foreground)] font-medium">{member.name}</div>
            <div className="text-xs text-[var(--muted-foreground)]">{member.role}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-[var(--muted-foreground)]">
          <button className="p-1.5 rounded-full hover:bg-[var(--secondary)] transition-colors">
            <MessageCircle className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-full hover:bg-[var(--secondary)] transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-1.5">
          <span className="text-[var(--muted-foreground)]">Task completion</span>
          <span className="text-[var(--foreground)] font-medium">{completionPercentage}%</span>
        </div>
        <div className="w-full h-2 bg-[var(--secondary)] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[var(--primary)]" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-2 bg-[var(--background)] rounded-lg">
          <div className="text-sm font-medium text-[var(--foreground)]">{member.assigned}</div>
          <div className="text-xs text-[var(--muted-foreground)]">Assigned</div>
        </div>
        <div className="text-center p-2 bg-[var(--background)] rounded-lg">
          <div className="text-sm font-medium text-[var(--foreground)]">{member.completed}</div>
          <div className="text-xs text-[var(--muted-foreground)]">Completed</div>
        </div>
      </div>

      {member.contact && (
        <div className="space-y-2 pt-3 border-t border-[var(--border)]">
          {member.contact.email && (
            <div className="flex items-center text-xs text-[var(--muted-foreground)]">
              <Mail className="h-3.5 w-3.5 mr-2" />
              <span className="truncate">{member.contact.email}</span>
            </div>
          )}
          {member.contact.phone && (
            <div className="flex items-center text-xs text-[var(--muted-foreground)]">
              <Phone className="h-3.5 w-3.5 mr-2" />
              <span>{member.contact.phone}</span>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-[var(--border)] flex justify-between">
        <button className="text-xs font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
          View Profile
        </button>
        <button className="text-xs font-medium text-[var(--primary)] hover:text-[var(--primary-light)] transition-colors flex items-center">
          <UserPlus className="h-3.5 w-3.5 mr-1" />
          Assign Tasks
        </button>
      </div>
    </div>
  )
}
