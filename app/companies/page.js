'use client'

import { MoreVertical } from 'lucide-react'

export default function CompaniesPage() {
    const companies = [
        {
            id: 1,
            logo: '/logos/google.png',
            name: 'TechCorp Inc.',
            size: '1000-5000 employees',
            industry: 'Technology',
            location: 'San Francisco, CA',
            contactName: 'John Smith',
            contactEmail: 'john.smith@techcorp.com',
            positions: 12,
            status: 'Active',
        },
        {
            id: 2,
            logo: '/logos/amazon.png',
            name: 'DesignHub',
            size: '100-500 employees',
            industry: 'Design Services',
            location: 'New York, NY',
            contactName: 'Sarah Johnson',
            contactEmail: 'sarah.j@designhub.com',
            positions: 5,
            status: 'Active',
        },
        // …add more as needed
    ]

    return (
        <div className="space-y-6">
            {/* Title + Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-3xl font-bold text-gray-900">Companies</h1>

                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    + Add Company
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
                <input
                    type="text"
                    placeholder="Search companies..."
                    className="px-3 py-2 border rounded-md focus:ring focus:ring-blue-200 flex-1 min-w-[200px]"
                />
                <select className="px-3 py-2 border rounded-md focus:ring focus:ring-blue-200">
                    <option>Industry</option>
                    <option>Technology</option>
                    <option>Design Services</option>
                </select>
                <select className="px-3 py-2 border rounded-md focus:ring focus:ring-blue-200">
                    <option>Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
                <button className="px-3 py-2 border rounded-md text-gray-700 hover:bg-gray-100">
                    More Filters
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Company
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Industry
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Location
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Contact Person
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Open Positions
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 relative">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {companies.map((c) => (
                            <tr key={c.id}>
                                {/* Company + Logo */}
                                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                                    <img
                                        src={c.logo}
                                        alt={c.name}
                                        className="w-8 h-8 object-contain rounded"
                                    />
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{c.name}</div>
                                        <div className="text-xs text-gray-500">{c.size}</div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {c.industry}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {c.location}
                                </td>

                                {/* Contact */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{c.contactName}</div>
                                    <div className="text-xs text-gray-500">{c.contactEmail}</div>
                                </td>

                                {/* Positions */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                    {c.positions} Positions
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${c.status === 'Active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}
                                    >
                                        {c.status}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-gray-500 hover:text-gray-700">
                                        <MoreVertical className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
