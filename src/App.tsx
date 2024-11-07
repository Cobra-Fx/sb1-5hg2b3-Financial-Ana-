import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BarChart2, Upload, FileText, PieChart } from 'lucide-react';
import FileUpload from './components/FileUpload';
import TransactionAnalysis from './components/TransactionAnalysis';
import FinancialMetrics from './components/FinancialMetrics';
import DataVisualization from './components/DataVisualization';
import ReportGeneration from './components/ReportGeneration';

// Mock data for demonstration
const mockTransactions = [
  { id: '1', date: '2024-03-10', description: 'Salary', amount: 5000, category: 'Income', type: 'income' as const },
  { id: '2', date: '2024-03-11', description: 'Rent', amount: -1500, category: 'Housing', type: 'expense' as const },
  { id: '3', date: '2024-03-12', description: 'Groceries', amount: -200, category: 'Food', type: 'expense' as const },
  { id: '4', date: '2024-03-13', description: 'Freelance', amount: 1000, category: 'Income', type: 'income' as const },
];

const mockMetrics = {
  totalIncome: 6000,
  totalExpenses: 1700,
  netIncome: 4300,
  topCategories: [
    { category: 'Housing', amount: 1500 },
    { category: 'Food', amount: 200 },
  ],
};

const mockChartData = {
  labels: ['Jan', 'Feb', 'Mar'],
  datasets: [{
    label: 'Expenses',
    data: [1200, 1900, 1700],
    backgroundColor: ['rgba(255, 99, 132, 0.5)'],
    borderColor: ['rgba(255, 99, 132, 1)'],
    borderWidth: 1,
  }],
};

const categoryChartData = {
  labels: ['Housing', 'Food', 'Transportation', 'Entertainment'],
  datasets: [{
    label: 'Expenses by Category',
    data: [1500, 200, 150, 100],
    backgroundColor: [
      'rgba(255, 99, 132, 0.5)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(255, 206, 86, 0.5)',
      'rgba(75, 192, 192, 0.5)',
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
    ],
    borderWidth: 1,
  }],
};

const incomeVsExpenseData = {
  labels: ['Jan', 'Feb', 'Mar'],
  datasets: [
    {
      label: 'Income',
      data: [3000, 3500, 6000],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderWidth: 2,
    },
    {
      label: 'Expenses',
      data: [1200, 1900, 1700],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderWidth: 2,
    },
  ],
};

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive
          ? 'text-blue-600 bg-blue-50'
          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
      }`}
    >
      {children}
    </Link>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <BarChart2 className="w-8 h-8 text-blue-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">Financial Analyzer</span>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                  <NavLink to="/">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </NavLink>
                  <NavLink to="/analysis">
                    <PieChart className="w-4 h-4 mr-2" />
                    Analysis
                  </NavLink>
                  <NavLink to="/reports">
                    <FileText className="w-4 h-4 mr-2" />
                    Reports
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={
              <div className="space-y-6">
                <FileUpload />
                <FinancialMetrics metrics={mockMetrics} />
              </div>
            } />
            <Route path="/analysis" element={
              <div className="space-y-6">
                <TransactionAnalysis transactions={mockTransactions} />
                <DataVisualization
                  expenseData={mockChartData}
                  incomeData={incomeVsExpenseData}
                  categoryData={categoryChartData}
                />
              </div>
            } />
            <Route path="/reports" element={<ReportGeneration />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;