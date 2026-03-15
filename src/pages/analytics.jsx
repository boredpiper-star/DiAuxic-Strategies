'use client';

import { useState, useEffect } from 'react';
import { generateKPIReport, analyzeTrends } from '../lib/kpiFeatures';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), { ssr: false });

export default function Analytics() {
  const [selectedCompany, setSelectedCompany] = useState('IT_COMPANY_001');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });
  const [report, setReport] = useState(null);
  const [trends, setTrends] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock companies
  const companies = [
    { id: 'IT_COMPANY_001', name: 'TechFlow Solutions' },
    { id: 'IT_COMPANY_002', name: 'CloudBase Systems' },
    { id: 'IT_COMPANY_003', name: 'DataVault Corp' },
  ];

  // Mock KPI data for last 12 months
  const generateMockData = () => {
    const data = {};
    const kpis = ['Revenue Growth', 'Profit Margin', 'Customer Retention', 'Employee Satisfaction'];
    
    kpis.forEach(kpi => {
      data[kpi] = Array.from({ length: 12 }, (_, i) => ({
        month: new Date(Date.now() - (11 - i) * 30 * 24 * 60 * 60 * 1000).toLocaleString('default', { month: 'short' }),
        value: Math.floor(Math.random() * 100) + 50 + (i * 2),
      }));
    });
    return data;
  };

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      const mockData = {
        companyId: selectedCompany,
        revenue: 250000,
        expenses: 150000,
        employees: 45,
        customers: 120,
        previousRevenue: 200000,
        previousExpenses: 130000,
      };

      const generatedReport = generateKPIReport(mockData);
      const trendAnalysis = analyzeTrends(generatedReport);

      setReport(generatedReport);
      setTrends(trendAnalysis);
      setError('');
    } catch (err) {
      setError(`Error generating report: ${err.message}`);
      setReport(null);
      setTrends(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 text-sm font-light mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-light text-slate-900 mb-2">KPI Analytics & Reports</h1>
          <p className="text-slate-600 font-light">Track performance trends and generate detailed KPI reports</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-lg font-light text-slate-900 mb-4">Report Filters</h2>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {/* Company Select */}
            <div>
              <label className="block text-sm font-light text-slate-600 mb-2">Company</label>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 font-light"
              >
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-light text-slate-600 mb-2">Start Date</label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 font-light"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-light text-slate-600 mb-2">End Date</label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 font-light"
              />
            </div>

            {/* Generate Button */}
            <div className="flex items-end">
              <button
                onClick={handleGenerateReport}
                disabled={loading}
                className="w-full px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-light rounded-lg transition-colors"
              >
                {loading ? '🔄 Generating...' : '📄 Generate Report'}
              </button>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-light">⚠️ {error}</p>
          </div>
        )}

        {/* Report Display */}
        {report && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-light text-slate-900 mb-6">Key Performance Indicators</h2>
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(report.kpis || {}).slice(0, 4).map(([name, value]) => (
                  <div key={name} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                    <p className="text-xs font-light text-slate-600 uppercase tracking-wide mb-2">{name}</p>
                    <p className="text-3xl font-light text-blue-700">
                      {typeof value === 'number' ? value.toFixed(2) : value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trends Analysis */}
            {trends && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-light text-slate-900 mb-6">Trend Analysis</h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(trends).map(([key, value]) => (
                    <div key={key} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <p className="text-sm font-light text-slate-600 mb-2">{key}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-light text-slate-900">{value.trend}</p>
                        <span
                          className={`text-lg ${
                            value.trend.includes('↑') ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {value.change}%
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">{value.insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Export Options */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-light text-slate-900 mb-4">Export Report</h2>
              <div className="flex gap-3">
                <button className="px-6 py-2.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-light transition-colors text-sm">
                  📚 Export as PDF
                </button>
                <button className="px-6 py-2.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg font-light transition-colors text-sm">
                  📊 Export as Excel
                </button>
                <button className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-light transition-colors text-sm">
                  📄 Export as JSON
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!report && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <p className="text-slate-600 font-light mb-4">Select filters and generate a report to view KPI analytics</p>
            <button
              onClick={handleGenerateReport}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-light transition-colors"
            >
              Generate Your First Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
