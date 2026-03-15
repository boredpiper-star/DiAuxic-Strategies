import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">DiAuxic Strategies</h1>
            <div className="flex gap-4">
              <Link href="/login" className="px-5 py-2 text-gray-700 hover:text-gray-900 font-medium transition">
                Login
              </Link>
              <Link href="/register" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            KPI Management for SMEs
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline your business performance with industry-specific KPIs. Upload financial reports and get instant insights tailored to your business.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-lg transition">
              Start Free Trial
            </Link>
            <Link href="/login" className="px-8 py-3 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg font-medium text-lg transition">
              Sign In
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Industry KPIs</h3>
            <p className="text-gray-600">
              Pre-built KPI templates for IT, Manufacturing, Retail, and more industries.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition">
            <div className="text-3xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Upload</h3>
            <p className="text-gray-600">
              Upload financial and operational reports. Our system extracts KPIs automatically.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Custom Dashboards</h3>
            <p className="text-gray-600">
              Role-based dashboards for admins, consultants, and customers with real-time analytics.
            </p>
          </div>
        </div>

        {/* Test Credentials */}
        <div className="mt-20 bg-blue-50 border border-blue-200 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Test the Platform</h3>
          <p className="text-gray-700 mb-4">Use these credentials to explore different roles:</p>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="bg-white p-4 rounded-lg border">
              <div className="font-semibold text-gray-900 mb-2">👑 Admin</div>
              <div className="text-gray-600">
                <div>Email: <code className="bg-gray-100 px-2 py-1 rounded">admin@example.com</code></div>
                <div>Password: <code className="bg-gray-100 px-2 py-1 rounded">admin123</code></div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="font-semibold text-gray-900 mb-2">💼 Consultant</div>
              <div className="text-gray-600">
                <div>Email: <code className="bg-gray-100 px-2 py-1 rounded">consultant@example.com</code></div>
                <div>Password: <code className="bg-gray-100 px-2 py-1 rounded">consultant123</code></div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="font-semibold text-gray-900 mb-2">👤 Customer</div>
              <div className="text-gray-600">
                <div>Email: <code className="bg-gray-100 px-2 py-1 rounded">customer@example.com</code></div>
                <div>Password: <code className="bg-gray-100 px-2 py-1 rounded">customer123</code></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-gray-600">
          <p>© 2026 DiAuxic Strategies. Management Consultancy Platform.</p>
        </div>
      </footer>
    </div>
  );
}
