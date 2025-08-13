import React from 'react'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Workflow, 
  BarChart3, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface SidebarProps {
  activeView: string
  setActiveView: (view: string) => void
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'workflow', label: 'Tax Workflow', icon: Workflow },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
]

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeView, 
  setActiveView, 
  collapsed, 
  setCollapsed 
}) => {
  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <div className="flex justify-end p-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-2 py-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeView === item.id
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveView(item.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className={`w-5 h-5 ${collapsed ? 'mx-auto' : 'mr-3'}`} />
                    {!collapsed && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="p-4 border-t border-border">
            <div className="text-xs text-muted-foreground">
              <div>Professional Document Management</div>
              <div>v1.0.0</div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}