// KPI Templates for different industries
export const KPI_TEMPLATES = {
  IT_SAAS: [
    {
      id: 1,
      name: 'Revenue Growth Rate',
      formula: '(Current Revenue - Previous Revenue) / Previous Revenue * 100',
      unit: '%',
      industry: 'IT/SaaS',
      category: 'Financial',
      benchmark: 20,
    },
    {
      id: 2,
      name: 'Profit Margin',
      formula: 'Net Income / Total Revenue * 100',
      unit: '%',
      industry: 'IT/SaaS',
      category: 'Financial',
      benchmark: 18,
    },
    {
      id: 3,
      name: 'Client Acquisition Cost (CAC)',
      formula: 'Marketing Spend / New Customers Acquired',
      unit: '$',
      industry: 'IT/SaaS',
      category: 'Sales',
      benchmark: 5000,
    },
    {
      id: 4,
      name: 'Customer Lifetime Value (CLV)',
      formula: 'Average Revenue Per User * Gross Margin % / Monthly Churn Rate',
      unit: '$',
      industry: 'IT/SaaS',
      category: 'Customer',
      benchmark: 50000,
    },
    {
      id: 5,
      name: 'Project Delivery On-Time Rate',
      formula: 'Projects Delivered On-Time / Total Projects * 100',
      unit: '%',
      industry: 'IT/SaaS',
      category: 'Operations',
      benchmark: 95,
    },
    {
      id: 6,
      name: 'Resource Utilization Rate',
      formula: 'Billable Hours / Total Available Hours * 100',
      unit: '%',
      industry: 'IT/SaaS',
      category: 'Operations',
      benchmark: 80,
    },
    {
      id: 7,
      name: 'Employee Productivity',
      formula: 'Revenue Per Employee / Average Industry Revenue Per Employee',
      unit: 'Index',
      industry: 'IT/SaaS',
      category: 'HR',
      benchmark: 1.0,
    },
    {
      id: 8,
      name: 'Employee Attrition Rate',
      formula: 'Employees Left / Average Total Employees * 100',
      unit: '%',
      industry: 'IT/SaaS',
      category: 'HR',
      benchmark: 15,
    },
  ],
};

// KPI Calculation Engine
export const calculateKPI = (formula, data) => {
  try {
    // Replace variable placeholders with actual values
    let calculation = formula;
    for (const [key, value] of Object.entries(data)) {
      calculation = calculation.replace(new RegExp(key, 'g'), value);
    }
    // Safely evaluate the formula
    const result = Function('"use strict"; return (' + calculation + ')')();
    return parseFloat(result.toFixed(2));
  } catch (error) {
    console.error('KPI Calculation Error:', error);
    return null;
  }
};

// Benchmark Comparison
export const compareWithBenchmark = (currentValue, benchmarkValue) => {
  const variance = ((currentValue - benchmarkValue) / benchmarkValue) * 100;
  return {
    variance: parseFloat(variance.toFixed(2)),
    status: variance >= 0 ? 'above' : 'below',
    percentage: Math.abs(variance),
  };
};

// KPI Status Indicator
export const getKPIStatus = (currentValue, targetValue, benchmarkValue) => {
  if (currentValue >= targetValue) return 'exceeding';
  if (currentValue >= benchmarkValue) return 'on-track';
  return 'below-target';
};

// Generate KPI Report
export const generateKPIReport = (kpis, company) => {
  const report = {
    company: company.name,
    generatedAt: new Date().toISOString(),
    kpis: kpis.map(kpi => ({
      ...kpi,
      status: getKPIStatus(kpi.currentValue, kpi.targetValue, kpi.benchmark),
      variance: compareWithBenchmark(kpi.currentValue, kpi.benchmark),
    })),
    summary: {
      totalKPIs: kpis.length,
      exceeding: kpis.filter(k => getKPIStatus(k.currentValue, k.targetValue, k.benchmark) === 'exceeding').length,
      onTrack: kpis.filter(k => getKPIStatus(k.currentValue, k.targetValue, k.benchmark) === 'on-track').length,
      belowTarget: kpis.filter(k => getKPIStatus(k.currentValue, k.targetValue, k.benchmark) === 'below-target').length,
    },
  };
  return report;
};

// Financial Data Extractor (for report parsing)
export const extractFinancialData = (reportData) => {
  // Mock extraction - in production, this would use ML/OCR
  const extracted = {
    revenue: reportData.revenue || 0,
    netIncome: reportData.netIncome || 0,
    employees: reportData.employees || 0,
    customers: reportData.customers || 0,
    expenses: reportData.expenses || 0,
  };
  return extracted;
};

// Trend Analysis
export const analyzeTrends = (historicalKPIs) => {
  if (historicalKPIs.length < 2) return null;

  const trends = {};
  historicalKPIs.forEach((kpi, index) => {
    if (index > 0) {
      const prevValue = historicalKPIs[index - 1].value;
      const currentValue = kpi.value;
      const change = ((currentValue - prevValue) / prevValue) * 100;
      trends[kpi.name] = {
        change: parseFloat(change.toFixed(2)),
        direction: change > 0 ? 'up' : 'down',
      };
    }
  });
  return trends;
};

export default {
  KPI_TEMPLATES,
  calculateKPI,
  compareWithBenchmark,
  getKPIStatus,
  generateKPIReport,
  extractFinancialData,
  analyzeTrends,
};
