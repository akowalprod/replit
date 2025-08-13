import React from 'react'
import { 
  Users, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Calendar
} from 'lucide-react'

const StatCard: React.FC<{
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: string
  trendUp?: boolean
}> = ({ title, value, icon, trend, trendUp }) => (
  <div className="card p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        {trend && (
          <p className={`text-xs flex items-center mt-1 ${
            trendUp ? 'text-green-600' : 'text-red-600'
          }`}>
            <TrendingUp className={`w-3 h-3 mr-1 ${!trendUp && 'rotate-180'}`} />
            {trend}
          </p>
        )}
      </div>
      <div className="text-primary">
        {icon}
      </div>
    </div>
  </div>
)

const RecentActivity: React.FC = () => (
  <div className="card p-6">
    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
    <div className="space-y-4">
      {[
        {
          action: 'Document uploaded',
          client: 'John Doe',
          time: '2 hours ago',
          type: 'upload'
        },
        {
          action: 'Tax return completed',
          client: 'Jane Smith',
          time: '4 hours ago',
          type: 'complete'
        },
        {
          action: 'Client meeting scheduled',
          client: 'Bob Johnson',
          time: '1 day ago',
          type: 'schedule'
        },
        {
          action: 'Document review needed',
          client: 'Alice Brown',
          time: '2 days ago',
          type: 'review'
        }
      ].map((activity, index) => (
        <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            activity.type === 'complete' ? 'bg-green-100 text-green-600' :
            activity.type === 'upload' ? 'bg-blue-100 text-blue-600' :
            activity.type === 'schedule' ? 'bg-purple-100 text-purple-600' :
            'bg-orange-100 text-orange-600'
          }`}>
            {activity.type === 'complete' && <CheckCircle className="w-4 h-4" />}
            {activity.type === 'upload' && <FileText className="w-4 h-4" />}
            {activity.type === 'schedule' && <Calendar className="w-4 h-4" />}
            {activity.type === 'review' && <AlertTriangle className="w-4 h-4" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{activity.action}</p>
            <p className="text-xs text-muted-foreground">{activity.client} • {activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const UpcomingDeadlines: React.FC = () => (
  <div className="card p-6">
    <h3 className="text-lg font-semibold mb-4">Upcoming Deadlines</h3>
    <div className="space-y-3">
      {[
        { client: 'ABC Corp', deadline: 'Tax Filing', date: 'Mar 15, 2024', urgent: true },
        { client: 'XYZ LLC', deadline: 'Quarterly Report', date: 'Mar 31, 2024', urgent: false },
        { client: 'Smith Family', deadline: 'Document Review', date: 'Apr 5, 2024', urgent: false },
      ].map((item, index) => (
        <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
          <div>
            <p className="text-sm font-medium text-foreground">{item.client}</p>
            <p className="text-xs text-muted-foreground">{item.deadline}</p>
          </div>
          <div className="text-right">
            <p className={`text-sm font-medium ${item.urgent ? 'text-red-600' : 'text-foreground'}`}>
              {item.date}
            </p>
            {item.urgent && (
              <span className="text-xs text-red-600 font-medium">Urgent</span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
)

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your tax preparation business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Clients"
          value={247}
          icon={<Users className="w-8 h-8" />}
          trend="+12% from last month"
          trendUp={true}
        />
        <StatCard
          title="Active Cases"
          value={89}
          icon={<FileText className="w-8 h-8" />}
          trend="+5% from last month"
          trendUp={true}
        />
        <StatCard
          title="Pending Reviews"
          value={23}
          icon={<Clock className="w-8 h-8" />}
          trend="-8% from last month"
          trendUp={false}
        />
        <StatCard
          title="Completed Returns"
          value={156}
          icon={<CheckCircle className="w-8 h-8" />}
          trend="+18% from last month"
          trendUp={true}
        />
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Monthly Revenue"
          value="$24,500"
          icon={<DollarSign className="w-8 h-8" />}
          trend="+15% from last month"
          trendUp={true}
        />
        <StatCard
          title="Average Case Value"
          value="$275"
          icon={<TrendingUp className="w-8 h-8" />}
          trend="+3% from last month"
          trendUp={true}
        />
        <StatCard
          title="Urgent Deadlines"
          value={7}
          icon={<AlertTriangle className="w-8 h-8" />}
        />
      </div>

      {/* Activity and Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <UpcomingDeadlines />
      </div>
    </div>
  )
}