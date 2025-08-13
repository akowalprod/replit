import React, { useState } from 'react'
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  FileText,
  Calendar,
  Download
} from 'lucide-react'

const ReportCard: React.FC<{
  title: string
  value: string | number
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: React.ReactNode
}> = ({ title, value, change, changeType, icon }) => (
  <div className="card p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className={`text-xs flex items-center mt-1 ${
          changeType === 'positive' ? 'text-green-600' : 
          changeType === 'negative' ? 'text-red-600' : 
          'text-muted-foreground'
        }`}>
          <TrendingUp className={`w-3 h-3 mr-1 ${changeType === 'negative' && 'rotate-180'}`} />
          {change}
        </p>
      </div>
      <div className="text-primary">
        {icon}
      </div>
    </div>
  </div>
)

const RevenueChart: React.FC = () => (
  <div className="card p-6">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-foreground">Monthly Revenue</h3>
      <button className="btn-secondary text-sm">
        <Download className="w-4 h-4 mr-2" />
        Export
      </button>
    </div>
    <div className="h-64 flex items-end justify-between space-x-2">
      {[
        { month: 'Jan', value: 18000, height: 45 },
        { month: 'Feb', value: 22000, height: 55 },
        { month: 'Mar', value: 24500, height: 61 },
        { month: 'Apr', value: 19000, height: 48 },
        { month: 'May', value: 26000, height: 65 },
        { month: 'Jun', value: 28500, height: 71 },
        { month: 'Jul', value: 31000, height: 78 },
        { month: 'Aug', value: 29000, height: 73 },
        { month: 'Sep', value: 33000, height: 83 },
        { month: 'Oct', value: 35500, height: 89 },
        { month: 'Nov', value: 38000, height: 95 },
        { month: 'Dec', value: 40000, height: 100 }
      ].map((data, index) => (
        <div key={index} className="flex flex-col items-center flex-1">
          <div className="w-full flex flex-col items-center">
            <div 
              className="w-full bg-primary rounded-t hover:bg-primary/80 transition-colors cursor-pointer"
              style={{ height: `${data.height}%` }}
              title={`$${data.value.toLocaleString()}`}
            ></div>
            <div className="text-xs text-muted-foreground mt-2">{data.month}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const ClientBreakdown: React.FC = () => (
  <div className="card p-6">
    <h3 className="text-lg font-semibold text-foreground mb-6">Client Breakdown</h3>
    <div className="space-y-4">
      {[
        { type: 'Individual Returns', count: 156, percentage: 65, color: 'bg-blue-500' },
        { type: 'Business Returns', count: 48, percentage: 20, color: 'bg-green-500' },
        { type: 'Corporate Filings', count: 24, percentage: 10, color: 'bg-purple-500' },
        { type: 'Amendments', count: 12, percentage: 5, color: 'bg-orange-500' }
      ].map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">{item.type}</span>
            <span className="text-sm text-muted-foreground">{item.count} ({item.percentage}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`${item.color} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${item.percentage}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const RecentReports: React.FC = () => (
  <div className="card p-6">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-foreground">Recent Reports</h3>
      <button className="btn-secondary text-sm">View All</button>
    </div>
    <div className="space-y-4">
      {[
        {
          name: 'Monthly Tax Summary - March 2024',
          type: 'Tax Summary',
          date: '2024-03-10',
          status: 'Ready'
        },
        {
          name: 'Client Revenue Report - Q1 2024',
          type: 'Revenue Report',
          date: '2024-03-08',
          status: 'Processing'
        },
        {
          name: 'Compliance Audit Report',
          type: 'Compliance',
          date: '2024-03-05',
          status: 'Ready'
        }
      ].map((report, index) => (
        <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">{report.name}</h4>
              <p className="text-sm text-muted-foreground">{report.type} • {report.date}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              report.status === 'Ready' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {report.status}
            </span>
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('last-30-days')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Track performance, revenue, and business insights.</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input w-auto"
          >
            <option value="last-7-days">Last 7 Days</option>
            <option value="last-30-days">Last 30 Days</option>
            <option value="last-90-days">Last 90 Days</option>
            <option value="this-year">This Year</option>
          </select>
          <button className="btn-primary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export All</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ReportCard
          title="Total Revenue"
          value="$124,500"
          change="+15% from last month"
          changeType="positive"
          icon={<DollarSign className="w-8 h-8" />}
        />
        <ReportCard
          title="Active Clients"
          value={247}
          change="+12% from last month"
          changeType="positive"
          icon={<Users className="w-8 h-8" />}
        />
        <ReportCard
          title="Returns Filed"
          value={189}
          change="+8% from last month"
          changeType="positive"
          icon={<FileText className="w-8 h-8" />}
        />
        <ReportCard
          title="Avg. Processing Time"
          value="3.2 days"
          change="-0.5 days from last month"
          changeType="positive"
          icon={<Calendar className="w-8 h-8" />}
        />
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <ClientBreakdown />
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Client Satisfaction</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">4.8</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
            <div className="flex justify-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={`text-lg ${star <= 4 ? 'text-yellow-500' : 'text-gray-300'}`}>
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Efficiency Rate</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">94%</div>
            <div className="text-sm text-muted-foreground">On-time Completion</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '94%' }}></div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Growth</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">+23%</div>
            <div className="text-sm text-muted-foreground">Year over Year</div>
            <div className="flex items-center justify-center mt-2 text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm">Trending Up</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <RecentReports />
    </div>
  )
}