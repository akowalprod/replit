import React from 'react'
import { Bell, Search, Settings, User } from 'lucide-react'

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">TP</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">Tax Preparation System</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search clients, documents..."
              className="input pl-10 w-64"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground">
              3
            </span>
          </button>

          {/* Settings */}
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-secondary-foreground" />
            </div>
            <div className="text-sm">
              <div className="font-medium text-foreground">John Smith</div>
              <div className="text-muted-foreground">Tax Professional</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}