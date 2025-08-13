import React, { useState } from 'react'
import { 
  Play, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  User,
  Calendar,
  DollarSign,
  FileText
} from 'lucide-react'

interface WorkflowStep {
  id: string
  name: string
  status: 'pending' | 'in-progress' | 'completed' | 'blocked'
  assignee?: string
  dueDate?: string
  description: string
}

interface TaxCase {
  id: string
  client: string
  type: 'individual' | 'business'
  status: 'not-started' | 'in-progress' | 'review' | 'completed'
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  estimatedValue: number
  progress: number
  steps: WorkflowStep[]
}

const mockCases: TaxCase[] = [
  {
    id: '1',
    client: 'John Smith',
    type: 'individual',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-03-15',
    estimatedValue: 450,
    progress: 60,
    steps: [
      { id: '1', name: 'Document Collection', status: 'completed', assignee: 'Sarah Johnson', description: 'Collect all necessary tax documents' },
      { id: '2', name: 'Data Entry', status: 'completed', assignee: 'Mike Davis', description: 'Enter client information and tax data' },
      { id: '3', name: 'Tax Calculations', status: 'in-progress', assignee: 'Sarah Johnson', dueDate: '2024-03-12', description: 'Calculate taxes and deductions' },
      { id: '4', name: 'Review & Approval', status: 'pending', assignee: 'John Wilson', description: 'Final review and approval' },
      { id: '5', name: 'Filing', status: 'pending', description: 'Submit tax return to IRS' }
    ]
  },
  {
    id: '2',
    client: 'ABC Corporation',
    type: 'business',
    status: 'review',
    priority: 'medium',
    dueDate: '2024-03-31',
    estimatedValue: 2500,
    progress: 85,
    steps: [
      { id: '1', name: 'Financial Statements Review', status: 'completed', assignee: 'Emily Chen', description: 'Review financial statements and records' },
      { id: '2', name: 'Business Deductions', status: 'completed', assignee: 'Emily Chen', description: 'Identify and calculate business deductions' },
      { id: '3', name: 'Tax Form Preparation', status: 'completed', assignee: 'Mike Davis', description: 'Prepare corporate tax forms' },
      { id: '4', name: 'Quality Check', status: 'in-progress', assignee: 'John Wilson', dueDate: '2024-03-14', description: 'Quality assurance review' },
      { id: '5', name: 'Client Approval', status: 'pending', description: 'Get client approval for filing' }
    ]
  }
]

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'blocked': return 'bg-red-100 text-red-800'
      case 'review': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
    </span>
  )
}

const WorkflowCard: React.FC<{ taxCase: TaxCase }> = ({ taxCase }) => (
  <div className="card p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground">{taxCase.client}</h3>
        <div className="flex items-center space-x-2 mt-1">
          <StatusBadge status={taxCase.status} />
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            taxCase.priority === 'high' ? 'bg-red-100 text-red-800' :
            taxCase.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            {taxCase.priority.charAt(0).toUpperCase() + taxCase.priority.slice(1)} Priority
          </span>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm text-muted-foreground">Due Date</div>
        <div className="font-medium text-foreground">{taxCase.dueDate}</div>
      </div>
    </div>

    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">Progress</span>
        <span className="text-sm font-medium text-foreground">{taxCase.progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300" 
          style={{ width: `${taxCase.progress}%` }}
        ></div>
      </div>
    </div>

    <div className="space-y-2 mb-4">
      <div className="flex items-center text-sm text-muted-foreground">
        <DollarSign className="w-4 h-4 mr-2" />
        Estimated Value: ${taxCase.estimatedValue}
      </div>
      <div className="flex items-center text-sm text-muted-foreground">
        <FileText className="w-4 h-4 mr-2" />
        Type: {taxCase.type.charAt(0).toUpperCase() + taxCase.type.slice(1)}
      </div>
    </div>

    <div className="border-t border-border pt-4">
      <h4 className="text-sm font-medium text-foreground mb-2">Current Steps</h4>
      <div className="space-y-2">
        {taxCase.steps.filter(step => step.status === 'in-progress' || step.status === 'pending').slice(0, 2).map(step => (
          <div key={step.id} className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              step.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
            }`}></div>
            <span className="text-sm text-foreground">{step.name}</span>
            {step.assignee && (
              <span className="text-xs text-muted-foreground">({step.assignee})</span>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
)

export const TaxWorkflow: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<TaxCase | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tax Workflow</h1>
          <p className="text-muted-foreground">Manage and track tax preparation workflows for all clients.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="text-2xl font-bold text-foreground">{mockCases.length}</div>
          <div className="text-sm text-muted-foreground">Active Cases</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-blue-600">
            {mockCases.filter(c => c.status === 'in-progress').length}
          </div>
          <div className="text-sm text-muted-foreground">In Progress</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-purple-600">
            {mockCases.filter(c => c.status === 'review').length}
          </div>
          <div className="text-sm text-muted-foreground">Under Review</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-red-600">
            {mockCases.filter(c => c.priority === 'high').length}
          </div>
          <div className="text-sm text-muted-foreground">High Priority</div>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockCases.map(taxCase => (
          <div key={taxCase.id} onClick={() => setSelectedCase(taxCase)} className="cursor-pointer">
            <WorkflowCard taxCase={taxCase} />
          </div>
        ))}
      </div>

      {/* Detailed View Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">{selectedCase.client} - Workflow Details</h2>
                <button 
                  onClick={() => setSelectedCase(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                {selectedCase.steps.map((step) => (
                  <div key={step.id} className="flex items-start space-x-4 p-4 rounded-lg border border-border">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.status === 'completed' ? 'bg-green-100 text-green-600' :
                      step.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                      step.status === 'blocked' ? 'bg-red-100 text-red-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {step.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : step.status === 'in-progress' ? (
                        <Play className="w-4 h-4" />
                      ) : step.status === 'blocked' ? (
                        <AlertTriangle className="w-4 h-4" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-foreground">{step.name}</h3>
                        <StatusBadge status={step.status} />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                      {step.assignee && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <User className="w-4 h-4 mr-1" />
                          {step.assignee}
                        </div>
                      )}
                      {step.dueDate && (
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          Due: {step.dueDate}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}