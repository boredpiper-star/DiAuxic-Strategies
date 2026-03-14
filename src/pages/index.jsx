import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-light text-slate-900">DiAuxic Strategies</h1>
            <div className="flex gap-4">
              <Link href="/login" className="px-6 py-2 text-slate-600 hover:text-slate-900 font-light transition-colors">
                Login
              </Link>
              <Link href="/register" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-light transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-light text-slate-900 mb-6">
            KPI Management Platform
          </h2>
          <p className="text-xl text-slate-600 font-light max-w-3xl mx-auto mb-8">
            Industry-specific KPI tracking for small and medium IT businesses.
            Upload financial reports, create custom KPIs, and get actionable insights.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg font-light transition-colors">
              Start Free Trial
            </Link>
            <Link href="#features" className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 text-lg rounded-lg border border-slate-200 font-light transition-colors">
              Learn More
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="grid grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-light text-slate-900 mb-3">Built-in KPI Templates</h3>
            <p className="text-slate-600 font-light">
              Pre-configured KPIs for IT and SaaS businesses. Get started quickly with industry best practices.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">📤</div>
            <h3 className="text-xl font-light text-slate-900 mb-3">Financial Data Upload</h3>
            <p className="text-slate-600 font-light">
              Upload PDF, Excel, or CSV financial reports. Our system automatically extracts key metrics.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-light text-slate-900 mb-3">Custom KPI Builder</h3>
            <p className="text-slate-600 font-light">
              Create ad-hoc KPIs with custom formulas tailored to your specific business needs.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-light text-slate-900 mb-3">Analytics & Reports</h3>
            <p className="text-slate-600 font-light">
              Generate detailed KPI reports with trend analysis and performance insights.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-light text-slate-900 mb-3">Role-Based Access</h3>
            <p className="text-slate-600 font-light">
              Separate dashboards for customers, consultants, and admins with granular permissions.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-light text-slate-900 mb-3">Industry Benchmarks</h3>
            <p className="text-slate-600 font-light">
              Compare your KPIs against industry standards and identify areas for improvement.
            </p>
          </div>
        </div>

        {/* Quick Access */}
        <div className="mt-20 bg-white rounded-xl p-10 shadow-sm border border-slate-200">
          <h3 className="text-2xl font-light text-slate-900 mb-6 text-center">Quick Access</h3>
          <div className="grid grid-cols-4 gap-4">
            <Link href="/kpi-builder" className="p-6 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 text-center transition-colors">
              <p className="text-blue-700 font-light">KPI Builder</p>
            </Link>
            <Link href="/file-upload" className="p-6 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 text-center transition-colors">
              <p className="text-green-700 font-light">Upload Reports</p>
            </Link>
            <Link href="/analytics" className="p-6 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 text-center transition-colors">
              <p className="text-purple-700 font-light">Analytics</p>
            </Link>
            <Link href="/dashboard" className="p-6 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-center transition-colors">
              <p className="text-slate-700 font-light">Dashboard</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-20">
        <div className="max-w-7xl mx-auto px-8 py-8 text-center">
          <p className="text-slate-600 font-light">
            © 2026 DiAuxic Strategies. Built for management consultants.
          </p>
        </div>
      </footer>
    </div>
  );
}
