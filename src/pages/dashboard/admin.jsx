'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 24,
    totalCompanies: 12,
    totalKPIs: 156,
    activeProjects: 8,
  });
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-light text-slate-700">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600">{user.name}</span>
            <Link href="/login" className="text-sm text-blue-500 hover:text-blue-600">
              Logout
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Users', value: stats.totalUsers, icon: '👥' },
            { label: 'Companies', value: stats.totalCompanies, icon: '🏢' },
            { label: 'KPIs', value: stats.totalKPIs, icon: '📊' },
            { label: 'Active Projects', value: stats.activeProjects, icon: '⚙️' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-light text-slate-600">{stat.label}</p>
                  <p className="text-3xl font-light text-slate-700 mt-2">{stat.value}</p>
                </div>
                <div className="text-4xl">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex border-b border-slate-200 mb-6">
            {['overview', 'users', 'templates', 'analytics'].map((tab) => (
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

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-light text-slate-700 mb-4">System Overview</h2>
              <p className="text-slate-600 mb-4">Welcome to the Admin Dashboard. Manage users, companies, and KPI templates from here.</p>
              <div className="space-y-3">
                <div className="flex items-center text-slate-700">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-sm">All systems operational</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-sm">Database connection active</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-sm">All users authenticated</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-light text-slate-700">User Management</h2>
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-light rounded-lg transition-colors">
                  Add User
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 px-4 font-light text-slate-600">Name</th>
                      <th className="text-left py-2 px-4 font-light text-slate-600">Email</th>
                      <th className="text-left py-2 px-4 font-light text-slate-600">Role</th>
                      <th className="text-left py-2 px-4 font-light text-slate-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Admin User', email: 'admin@example.com', role: 'Admin', status: 'Active' },
                      { name: 'John Consultant', email: 'john@example.com', role: 'Consultant', status: 'Active' },
                      { name: 'Acme Corp', email: 'contact@acme.com', role: 'Customer', status: 'Active' },
                    ].map((row, idx) => (
                      <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4 text-slate-700">{row.name}</td>
                        <td className="py-3 px-4 text-slate-700">{row.email}</td>
                        <td className="py-3 px-4 text-slate-700">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{row.role}</span>
                        </td>
                        <td className="py-3 px-4 text-green-600 font-light">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-light text-slate-700">KPI Templates</h2>
                <Link href="/kpi-templates/create" className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-light rounded-lg transition-colors">
                  Create Template
                </Link>
              </div>
              <p className="text-slate-600 text-sm">Manage industry-specific KPI templates</p>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-xl font-light text-slate-700 mb-4">System Analytics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-slate-600 mb-2">Avg KPIs per Company</p>
                  <p className="text-2xl font-light text-slate-700">13</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-slate-600 mb-2">Reports Uploaded</p>
                  <p className="text-2xl font-light text-slate-700">45</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
