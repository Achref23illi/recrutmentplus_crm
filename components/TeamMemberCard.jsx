// components/TeamMemberCard.jsx
'use client'

import { MessageCircle, MoreVertical } from 'lucide-react'

export default function TeamMemberCard({ member }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img
          src={member.avatar}
          alt={member.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="text-sm font-medium text-gray-900">{member.name}</div>
          <div className="text-xs text-gray-500">{member.role}</div>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="text-sm text-gray-700">
          <span className="font-medium">{member.assigned}</span> assigned
        </div>
        <div className="text-sm text-gray-700">
          <span className="font-medium">{member.completed}</span> completed
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <MessageCircle className="w-5 h-5 cursor-pointer" />
          <MoreVertical className="w-5 h-5 cursor-pointer" />
        </div>
      </div>
    </div>
)
}
