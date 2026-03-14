'use client';

import { useState } from 'react';
import { extractFinancialData } from '@/lib/kpiFeatures';
import Link from 'next/link';

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload a PDF, Excel, or CSV file');
      return;
    }

    setFile(selectedFile);
    setError('');
    setPreview(null);
  };

  const handleUploadAndExtract = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    try {
      // Read file as text (simplified for demo)
      const text = await file.text();

      // Extract financial data using kpiFeatures
      const data = extractFinancialData(text);

      setExtractedData(data);
      setPreview({
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(2)} KB`,
        uploadTime: new Date().toLocaleString(),
      });
      setError('');
    } catch (err) {
      setError(`Error processing file: ${err.message}`);
      setExtractedData(null);
    } finally {
      setLoading(false);
    }
  };

  const downloadExtractedData = () => {
    if (!extractedData) return;

    const dataStr = JSON.stringify(extractedData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `extracted-financial-data-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 text-sm font-light mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-light text-slate-900 mb-2">Upload Financial Reports</h1>
          <p className="text-slate-600 font-light">Upload financial or operational reports to extract KPI data</p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Upload Area */}
          <div className="col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-6">
              <h2 className="text-lg font-light text-slate-900 mb-6">Upload Report</h2>

              {/* Drag and Drop Area */}
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center mb-6 hover:border-blue-400 transition-colors">
                <div className="mb-4">
                  <svg
                    className="w-16 h-16 mx-auto text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33A3 3 0 0116.5 19.5H6.75z"
                    />
                  </svg>
                </div>
                <p className="text-slate-600 font-light mb-2">Drag and drop your file here, or click to select</p>
                <label className="inline-block">
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept=".pdf,.xlsx,.csv"
                    className="hidden"
                  />
                  <span className="px-6 py-2.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg cursor-pointer transition-colors font-light text-sm">
                    Choose File
                  </span>
                </label>
                <p className="text-xs text-slate-500 mt-2">Supported formats: PDF, Excel, CSV</p>
              </div>

              {/* File Info */}
              {file && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-900 font-light text-sm">Selected: <span className="font-medium">{file.name}</span></p>
                  <p className="text-blue-700 font-light text-xs mt-1">Size: {(file.size / 1024).toFixed(2)} KB</p>
                </div>
              )}

              {/* Upload Button */}
              <div className="flex gap-3">
                <button
                  onClick={handleUploadAndExtract}
                  disabled={!file || loading}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-light rounded-lg transition-colors"
                >
                  {loading ? '📤 Processing...' : '📤 Extract Data'}
                </button>
                {file && (
                  <button
                    onClick={() => {
                      setFile(null);
                      setError('');
                      setPreview(null);
                    }}
                    className="flex-1 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-light rounded-lg transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                <p className="text-red-700 font-light">⚠️ {error}</p>
              </div>
            )}
          </div>

          {/* Info Panel */}
          <div className="col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-fit">
            <h2 className="text-lg font-light text-slate-900 mb-4">Supported Formats</h2>
            <div className="space-y-3 text-sm font-light">
              <div>
                <p className="text-slate-600">📄 PDF</p>
                <p className="text-xs text-slate-500">Financial statements, audit reports</p>
              </div>
              <div>
                <p className="text-slate-600">📊 Excel</p>
                <p className="text-xs text-slate-500">Spreadsheets with financial data</p>
              </div>
              <div>
                <p className="text-slate-600">📋 CSV</p>
                <p className="text-xs text-slate-500">Comma-separated values</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-200">
              <h3 className="text-sm font-light text-slate-900 mb-3">Extracted Fields</h3>
              <ul className="text-xs font-light space-y-1 text-slate-600">
                <li>✓ Revenue</li>
                <li>✓ Expenses</li>
                <li>✓ Profit</li>
                <li>✓ Employee Count</li>
                <li>✓ Customer Count</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Extracted Data Display */}
        {extractedData && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-light text-slate-900 mb-2">Extracted Financial Data</h2>
                <p className="text-sm text-green-700 font-light">✓ Data successfully extracted from {preview?.fileName}</p>
              </div>
              <button
                onClick={downloadExtractedData}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-light text-sm transition-colors"
              >
                ⬇️ Download JSON
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {Object.entries(extractedData).map(([key, value]) => (
                <div key={key} className="bg-white rounded-lg p-4 border border-green-200">
                  <p className="text-xs text-slate-600 font-light uppercase tracking-wide mb-1">{key}</p>
                  <p className="text-2xl font-light text-green-700">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
