'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CustomerDashboard() {
  const [kpis] = useState([
    { id: 1, name: 'Revenue Growth', value: '24.5%', target: '25%', status: 'on-track' },
    { id: 2, name: 'Profit Margin', value: '18.3%', target: '20%', status: 'below' },
    { id: 3, name: 'Client Retention', value: '92%', target: '95%', status: 'on-track' },
    { id: 4, name: 'Project Delivery', value: '96%', target: '99%', status: 'on-track' },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-light text-slate-700">Dashboard</h1>
          <Link href="/login" className="text-sm text-blue-500 hover:text-blue-600">Logout</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Company Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-light text-slate-700 mb-4">Your KPIs</h2>
          <p className="text-sm text-slate-600 mb-6">Monitor your key performance indicators</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi) => (
              <div key={kpi.id} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <p className="text-sm text-slate-600 mb-2">{kpi.name}</p>
                <p className="text-3xl font-light text-slate-700 mb-3">{kpi.value}</p>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Target: {kpi.target}</span>
                  <span className={`px-2 py-1 rounded ${
                    kpi.status === 'on-track' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {kpi.status === 'on-track' ? '✓ On Track' : '⚠ Below Target'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Report Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-light text-slate-700 mb-4">Upload Financial Report</h2>
          <p className="text-sm text-slate-600 mb-4">Upload your latest financial or operational reports for KPI analysis</p>
          
          <Link href="/report-upload" className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-light rounded-lg transition-colors">
            Upload Report
          </Link>
        </div>
      </div>
    </div>
  );
}
