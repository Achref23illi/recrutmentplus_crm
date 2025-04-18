// components/ToolCard.jsx
'use client'

export default function ToolCard({ title, icon: Icon }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow hover:shadow-md cursor-pointer flex items-center space-x-3">
      <Icon className="h-6 w-6 text-blue-600" />
      <span className="text-gray-800 font-medium">{title}</span>
    </div>
  )
}
