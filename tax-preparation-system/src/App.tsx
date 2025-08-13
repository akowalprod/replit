import { useState } from 'react'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Dashboard } from './components/Dashboard'
import { ClientManagement } from './components/ClientManagement'
import { DocumentManager } from './components/DocumentManager'
import { TaxWorkflow } from './components/TaxWorkflow'
import { Reports } from './components/Reports'
import './App.css'

type ActiveView = 'dashboard' | 'clients' | 'documents' | 'workflow' | 'reports'

function App() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />
      case 'clients':
        return <ClientManagement />
      case 'documents':
        return <DocumentManager />
      case 'workflow':
        return <TaxWorkflow />
      case 'reports':
        return <Reports />
      default:
        return <Dashboard />
    }
  }

  const handleViewChange = (view: string) => {
    setActiveView(view as ActiveView)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar 
          activeView={activeView}
          setActiveView={handleViewChange}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        <main className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}>
          <div className="p-6">
            {renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
