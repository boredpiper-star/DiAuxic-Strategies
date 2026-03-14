'use client';

import { useState } from 'react';
import { KPI_TEMPLATES, calculateKPI } from '@/lib/kpiFeatures';
import Link from 'next/link';

export default function KPIBuilder() {
  const [kpiType, setKpiType] = useState('template');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customKPI, setCustomKPI] = useState({
    name: '',
    formula: '',
    targetValue: '',
    frequency: 'monthly',
    unit: '%',
    assignedCompanies: [],
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const templates = KPI_TEMPLATES.IT_SAAS || [];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template.id);
    setCustomKPI({
      name: template.name,
      formula: template.formula,
      targetValue: template.targetValue.toString(),
      frequency: template.frequency,
      unit: template.unit,
      assignedCompanies: [],
    });
    setError('');
    setResult(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomKPI((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateKPI = () => {
    // Validation
    if (!customKPI.name.trim()) {
      setError('KPI name is required');
      return;
    }
    if (!customKPI.formula.trim()) {
      setError('Formula is required');
      return;
    }
    if (!customKPI.targetValue) {
      setError('Target value is required');
      return;
    }

    // Test the KPI
    try {
      const testResult = calculateKPI({
        name: customKPI.name,
        formula: customKPI.formula,
        targetValue: parseFloat(customKPI.targetValue),
        frequency: customKPI.frequency,
        unit: customKPI.unit,
      }, {
        revenue: 100000,
        expenses: 60000,
        employees: 50,
        customers: 150,
      });

      setResult({
        success: true,
        kpi: customKPI,
        calculated: testResult,
        message: 'KPI created successfully! Ready to assign to companies.',
      });
      setError('');
    } catch (err) {
      setError(`Formula Error: ${err.message}`);
      setResult(null);
    }
  };

  const handleTestFormula = () => {
    if (!customKPI.formula.trim()) {
      setError('Please enter a formula to test');
      return;
    }

    try {
      const testData = {
        revenue: 100000,
        expenses: 60000,
        employees: 50,
        customers: 150,
        profit: 40000,
      };

      const result = calculateKPI({
        name: customKPI.name || 'Test KPI',
        formula: customKPI.formula,
        targetValue: parseFloat(customKPI.targetValue) || 0,
        frequency: customKPI.frequency,
        unit: customKPI.unit,
      }, testData);

      setResult({
        success: true,
        testResult: result,
        testData: testData,
        message: 'Formula tested successfully!',
      });
      setError('');
    } catch (err) {
      setError(`Test Error: ${err.message}`);
      setResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 text-sm font-light mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-light text-slate-900 mb-2">KPI Builder</h1>
          <p className="text-slate-600 font-light">Create and customize KPIs for your organization</p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Panel - Template Selection */}
          <div className="col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-fit">
            <h2 className="text-lg font-light text-slate-900 mb-4">Available Templates</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all font-light ${
                    selectedTemplate === template.id
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className="font-medium text-sm">{template.name}</div>
                  <div className="text-xs text-slate-600 mt-1">{template.formula}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Middle Panel - KPI Configuration */}
          <div className="col-span-2 space-y-6">
            {/* Type Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-light text-slate-900 mb-4">Create KPI</h2>

              {/* KPI Name */}
              <div className="mb-6">
                <label className="block text-sm font-light text-slate-600 mb-2">KPI Name</label>
                <input
                  type="text"
                  name="name"
                  value={customKPI.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Revenue Growth Rate"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 font-light"
                />
              </div>

              {/* Formula */}
              <div className="mb-6">
                <label className="block text-sm font-light text-slate-600 mb-2">Formula</label>
                <textarea
                  name="formula"
                  value={customKPI.formula}
                  onChange={handleInputChange}
                  placeholder="e.g., (revenue - prevRevenue) / prevRevenue * 100"
                  rows="3"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 font-light"
                />
                <p className="text-xs text-slate-500 mt-2">Available variables: revenue, expenses, employees, customers, profit</p>
              </div>

              {/* Target Value */}
              <div className="mb-6">
                <label className="block text-sm font-light text-slate-600 mb-2">Target Value</label>
                <input
                  type="number"
                  name="targetValue"
                  value={customKPI.targetValue}
                  onChange={handleInputChange}
                  placeholder="e.g., 25"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 font-light"
                />
              </div>

              {/* Unit and Frequency Row */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Unit */}
                <div>
                  <label className="block text-sm font-light text-slate-600 mb-2">Unit</label>
                  <select
                    name="unit"
                    value={customKPI.unit}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 font-light"
                  >
                    <option value="%">% (Percentage)</option>
                    <option value="$">$ (Currency)</option>
                    <option value="#">Count</option>
                    <option value="Index">Index</option>
                  </select>
                </div>

                {/* Frequency */}
                <div>
                  <label className="block text-sm font-light text-slate-600 mb-2">Review Frequency</label>
                  <select
                    name="frequency"
                    value={customKPI.frequency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 font-light"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={handleTestFormula}
                  className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-light rounded-lg transition-colors"
                >
                  🧪 Test Formula
                </button>
                <button
                  onClick={handleCreateKPI}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-light rounded-lg transition-colors"
                >
                  ✅ Create KPI
                </button>
                <button
                  onClick={() => {
                    setCustomKPI({
                      name: '',
                      formula: '',
                      targetValue: '',
                      frequency: 'monthly',
                      unit: '%',
                      assignedCompanies: [],
                    });
                    setError('');
                    setResult(null);
                  }}
                  className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-light rounded-lg transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-light">{error}</p>
          </div>
        )}

        {/* Result Display */}
        {result && (
          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-light mb-4">{result.message}</p>
            {result.testResult && (
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h3 className="font-light text-slate-900 mb-3">Test Results</h3>
                <div className="grid grid-cols-2 gap-4 text-sm font-light">
                  <div>
                    <p className="text-slate-600">Formula Result:</p>
                    <p className="text-xl font-medium text-green-700">{result.testResult.toFixed(2)} {customKPI.unit}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Target Value:</p>
                    <p className="text-xl font-medium text-blue-700">{customKPI.targetValue} {customKPI.unit}</p>
                  </div>
                </div>
              </div>
            )}
            {result.kpi && (
              <div className="bg-white rounded-lg p-4 border border-green-200 mt-4">
                <h3 className="font-light text-slate-900 mb-3">KPI Configuration</h3>
                <div className="text-sm font-light space-y-2">
                  <p><span className="text-slate-600">Name:</span> {result.kpi.name}</p>
                  <p><span className="text-slate-600">Formula:</span> {result.kpi.formula}</p>
                  <p><span className="text-slate-600">Target:</span> {result.kpi.targetValue} {result.kpi.unit}</p>
                  <p><span className="text-slate-600">Frequency:</span> {result.kpi.frequency}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
