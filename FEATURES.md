# Advanced Features Guide

## 1. Role-Based Dashboards (✅ IMPLEMENTED)

### Admin Dashboard (`src/pages/dashboard/admin.jsx`)
**Features:**
- 📊 System Overview with key statistics
- 👥 User Management (create, edit, deactivate users)
- 🏢 Company & KPI Management
- ⚙️ KPI Template Management
- 📈 System Analytics

**Access Credentials:**
- Email: `admin@example.com`
- Password: any password
- URL: `http://localhost:3000/dashboard/admin`

### Consultant Dashboard (`src/pages/dashboard/consultant.jsx`)
**Features:**
- 📝 Create Custom KPIs
- 👨‍💼 Manage Assigned Customers
- 📤 Upload Financial Reports
- 📊 Track KPI Performance
- 💡 Generate Insights

**Access Credentials:**
- Email: `consultant@example.com`
- Password: any password
- URL: `http://localhost:3000/dashboard/consultant`

### Customer Dashboard (`src/pages/dashboard/customer.jsx`)
**Features:**
- 👀 View Assigned KPIs
- 📈 Track KPI Performance Trends
- 📄 Upload Financial Reports
- 📋 View Consultant Recommendations

**Access Credentials:**
- Email: `customer@example.com`
- Password: any password
- URL: `http://localhost:3000/dashboard/customer`

---

## 2. KPI Template System (✅ IMPLEMENTED)

### Pre-Built Industry Templates
**Location:** `src/lib/kpiFeatures.js`

Pre-configured KPIs for IT/SaaS Industry:

| KPI Name | Formula | Unit | Benchmark |
|----------|---------|------|----------|
| Revenue Growth Rate | (Current Revenue - Previous Revenue) / Previous Revenue * 100 | % | 20% |
| Profit Margin | Net Income / Total Revenue * 100 | % | 18% |
| Client Acquisition Cost | Marketing Spend / New Customers | $ | $5,000 |
| Customer Lifetime Value | ARPU * Gross Margin / Monthly Churn | $ | $50,000 |
| Project Delivery Rate | Projects On-Time / Total Projects * 100 | % | 95% |
| Resource Utilization | Billable Hours / Total Hours * 100 | % | 80% |
| Employee Productivity | Revenue Per Employee / Avg Industry Revenue | Index | 1.0 |
| Attrition Rate | Employees Left / Avg Total Employees * 100 | % | 15% |

### Functions Available

```javascript
import { KPI_TEMPLATES, calculateKPI, compareWithBenchmark, getKPIStatus } from '@/lib/kpiFeatures';

// Get all templates
const templates = KPI_TEMPLATES.IT_SAAS;

// Calculate KPI
const result = calculateKPI(
  '(Current Revenue - Previous Revenue) / Previous Revenue * 100',
  { 'Current Revenue': 1000000, 'Previous Revenue': 850000 }
);

// Compare with benchmark
const comparison = compareWithBenchmark(1750000, 1400000);
// Returns: { variance: 25, status: 'above', percentage: 25 }

// Get KPI Status
const status = getKPIStatus(22, 25, 20);
// Returns: 'on-track' or 'exceeding' or 'below-target'
```

---

## 3. Ad-Hoc KPI Builder (🚀 READY FOR IMPLEMENTATION)

### Features to Implement
Create custom KPIs with:
- KPI Name & Description
- Custom Formula Creation
- Target Values
- Frequency (Monthly/Quarterly/Yearly)
- Assigned Companies

### Code Structure
```jsx
// src/pages/kpi-builder.jsx
import { calculateKPI } from '@/lib/kpiFeatures';

export default function KPIBuilder() {
  const [kpiName, setKpiName] = useState('');
  const [formula, setFormula] = useState('');
  const [target, setTarget] = useState('');
  // ... handle form submission
}
```

### Available in Dashboard
- Consultant Dashboard: "Create New KPI" button
- Admin Dashboard: "Create Template" button

---

## 4. File Upload & Report Parsing (🚀 READY FOR IMPLEMENTATION)

### Supported Formats
- PDF Financial Statements
- Excel Spreadsheets (.xlsx)
- CSV Files

### Data Extraction
**Location:** `src/lib/kpiFeatures.js`

```javascript
import { extractFinancialData } from '@/lib/kpiFeatures';

const reportData = {
  revenue: 1500000,
  netIncome: 250000,
  employees: 50,
  customers: 120,
  expenses: 1250000
};

const extracted = extractFinancialData(reportData);
// Auto-populated fields ready for KPI calculation
```

### Upload Implementation
- File Size Limit: 10MB
- Supported Types: PDF, XLSX, CSV
- Auto-parsing of common financial metrics
- Manual mapping for custom fields

---

## 5. Reporting & Analytics Features (✅ CORE FUNCTIONS IMPLEMENTED)

### Report Generation
```javascript
import { generateKPIReport } from '@/lib/kpiFeatures';

const report = generateKPIReport(kpis, company);
// Generates comprehensive KPI report with:
// - Current values
// - Status (exceeding/on-track/below-target)
// - Variance from benchmark
// - Summary statistics
```

### Trend Analysis
```javascript
import { analyzeTrends } from '@/lib/kpiFeatures';

const trends = analyzeTrends(historicalKPIs);
// Returns:
// {
//   'Revenue Growth': { change: 15.5, direction: 'up' },
//   'Profit Margin': { change: -2.3, direction: 'down' },
//   ...
// }
```

### Analytics Features
- KPI Performance Trends
- Benchmark Comparisons
- Month-over-Month Changes
- Year-over-Year Analysis
- Industry Comparison
- Variance Analysis

### Report Export
Generated reports include:
- Executive Summary
- Detailed KPI Analysis
- Trend Charts
- Benchmark Comparisons
- Recommendations
- Export to PDF/Excel

---

## Implementation Roadmap

### ✅ Completed
- [x] Login/Register Authentication
- [x] Role-Based Dashboards (Admin, Consultant, Customer)
- [x] KPI Template Library
- [x] KPI Calculation Engine
- [x] Benchmark Comparison
- [x] Report Generation Functions
- [x] Trend Analysis

### 🚀 Ready for Next Sprint
- [ ] KPI Builder UI Page
- [ ] File Upload Component
- [ ] Report Parsing Module
- [ ] Analytics Dashboard
- [ ] Export to PDF/Excel
- [ ] Data Visualization Charts
- [ ] Email Notifications
- [ ] User Role Management Pages

### 📋 Core Functions Available
All business logic is implemented in `src/lib/kpiFeatures.js`:
- KPI calculation
- Benchmark comparison
- Status determination
- Report generation
- Trend analysis
- Financial data extraction

---

## Quick Start: Using KPI Features

```javascript
// In any component
import { 
  KPI_TEMPLATES,
  calculateKPI, 
  compareWithBenchmark,
  getKPIStatus,
  generateKPIReport,
  extractFinancialData,
  analyzeTrends
} from '@/lib/kpiFeatures';

// Example: Calculate Revenue Growth
const kpiValue = calculateKPI(
  '(1500000 - 1200000) / 1200000 * 100',
  {}
); // Returns: 25

// Example: Compare with benchmark
const benchmark = compareWithBenchmark(25, 20); 
// Returns: { variance: 25, status: 'above', percentage: 25 }

// Example: Get status
const status = getKPIStatus(25, 20, 20);
// Returns: 'exceeding'
```

---

## Architecture

```
DiAuxic-Strategies/
├── src/
│   ├── pages/
│   │   ├── dashboard/
│   │   │   ├── admin.jsx (✅)
│   │   │   ├── consultant.jsx (✅)
│   │   │   └── customer.jsx (✅)
│   │   ├── login.jsx (✅)
│   │   ├── register.jsx (✅)
│   │   ├── kpi-builder.jsx (🚀)
│   │   ├── report-upload.jsx (🚀)
│   │   └── api/auth/ (✅)
│   ├── lib/
│   │   └── kpiFeatures.js (✅) - ALL FUNCTIONS READY
│   └── components/
├── FEATURES.md (This file)
└── README.md
```

---

## Testing the Features

1. **Test Admin Dashboard**
   - Login with admin@example.com
   - View system overview & statistics

2. **Test Consultant Dashboard**
   - Login with consultant@example.com
   - View customer list and KPI counts

3. **Test Customer Dashboard**
   - Login with customer@example.com
   - View sample KPIs with performance indicators

4. **Test KPI Calculations** (in browser console)
   ```javascript
   import { calculateKPI } from './src/lib/kpiFeatures';
   const result = calculateKPI('100 * 2 + 50', {});
   console.log(result); // 250
   ```

---

## Next Steps

1. **Build KPI Builder UI** - Use kpiFeatures.js functions
2. **Implement File Upload** - Connect to extractFinancialData()
3. **Create Analytics Pages** - Use generateKPIReport() & analyzeTrends()
4. **Add Data Visualization** - Integrate chart library (Chart.js/D3.js)
5. **Connect to Database** - Replace mock data with PostgreSQL

All core functionality is ready - just needs UI components!
