'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ConsultantDashboard() {
  const [activeTab, setActiveTab] = useState('kpis');
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Acme Corp', kpis: 12, lastUpdated: '2 days ago' },
    { id: 2, name: 'TechStart Inc', kpis: 8, lastUpdated: '1 week ago' },
    { id: 3, name: 'Global Services Ltd', kpis: 15, lastUpdated: 'Today' },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-light text-slate-700">Consultant Dashboard</h1>
          <Link href="/login" className="text-sm text-blue-500 hover:text-blue-600">Logout</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link href="/kpi-builder" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <p className="text-sm text-slate-600 mb-2">Create KPI</p>
            <p className="text-2xl font-light text-blue-600">+</p>
          </Link>
          <Link href="/report-upload" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <p className="text-sm text-slate-600 mb-2">Upload Report</p>
            <p className="text-2xl font-light text-emerald-600">📤</p>
          </Link>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-sm text-slate-600 mb-2">Customers</p>
            <p className="text-2xl font-light text-slate-700">{customers.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex border-b border-slate-200 mb-6">
            {['kpis', 'customers', 'reports'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-light text-sm capitalize border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === 'kpis' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-light text-slate-700">KPIs</h2>
                <Link href="/kpi-builder" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-light rounded-lg">
                  Create New KPI
                </Link>
              </div>
              <p className="text-slate-600 text-sm">Create custom KPIs for your customers</p>
            </div>
          )}
          
          {activeTab === 'customers' && (
            <div>
              <h2 className="text-xl font-light text-slate-700 mb-4">Assigned Customers</h2>
              <div className="space-y-3">
                {customers.map((customer) => (
                  <div key={customer.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-light text-slate-700">{customer.name}</h3>
                        <p className="text-sm text-slate-600 mt-1">{customer.kpis} KPIs • Updated {customer.lastUpdated}</p>
                      </div>
                      <Link href={`/customer/${customer.id}`} className="text-sm text-blue-500 hover:text-blue-600">
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'reports' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-light text-slate-700">Uploaded Reports</h2>
                <Link href="/report-upload" className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-light rounded-lg">
                  Upload Report
                </Link>
              </div>
              <p className="text-slate-600 text-sm">Upload financial statements and operational reports</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
