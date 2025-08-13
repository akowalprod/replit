import React, { useState } from 'react'
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Phone, 
  Mail, 
  MapPin,
  User,
  Building
} from 'lucide-react'

interface Client {
  id: string
  name: string
  email: string
  phone: string
  address: string
  type: 'individual' | 'business'
  status: 'active' | 'inactive' | 'pending'
  lastContact: string
  totalReturns: number
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, ST 12345',
    type: 'individual',
    status: 'active',
    lastContact: '2024-03-10',
    totalReturns: 3
  },
  {
    id: '2',
    name: 'ABC Corporation',
    email: 'contact@abccorp.com',
    phone: '(555) 987-6543',
    address: '456 Business Ave, Corporate City, ST 67890',
    type: 'business',
    status: 'active',
    lastContact: '2024-03-08',
    totalReturns: 5
  },
  {
    id: '3',
    name: 'Jane Doe',
    email: 'jane.doe@email.com',
    phone: '(555) 456-7890',
    address: '789 Oak St, Hometown, ST 54321',
    type: 'individual',
    status: 'pending',
    lastContact: '2024-03-05',
    totalReturns: 1
  }
]

const ClientCard: React.FC<{ client: Client }> = ({ client }) => (
  <div className="card p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          client.type === 'business' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
        }`}>
          {client.type === 'business' ? (
            <Building className="w-6 h-6" />
          ) : (
            <User className="w-6 h-6" />
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{client.name}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            client.status === 'active' ? 'bg-green-100 text-green-800' :
            client.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
          </span>
        </div>
      </div>
      <button className="p-2 hover:bg-accent rounded-lg transition-colors">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>

    <div className="space-y-2 mb-4">
      <div className="flex items-center text-sm text-muted-foreground">
        <Mail className="w-4 h-4 mr-2" />
        {client.email}
      </div>
      <div className="flex items-center text-sm text-muted-foreground">
        <Phone className="w-4 h-4 mr-2" />
        {client.phone}
      </div>
      <div className="flex items-center text-sm text-muted-foreground">
        <MapPin className="w-4 h-4 mr-2" />
        {client.address}
      </div>
    </div>

    <div className="flex justify-between items-center pt-4 border-t border-border">
      <div className="text-sm">
        <span className="text-muted-foreground">Last Contact: </span>
        <span className="text-foreground font-medium">{client.lastContact}</span>
      </div>
      <div className="text-sm">
        <span className="text-muted-foreground">Returns: </span>
        <span className="text-foreground font-medium">{client.totalReturns}</span>
      </div>
    </div>
  </div>
)

export const ClientManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'individual' | 'business'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'pending'>('all')

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || client.type === filterType
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Client Management</h1>
          <p className="text-muted-foreground">Manage your tax preparation clients and their information.</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Client</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="input w-auto"
          >
            <option value="all">All Types</option>
            <option value="individual">Individual</option>
            <option value="business">Business</option>
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="input w-auto"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="text-2xl font-bold text-foreground">{mockClients.length}</div>
          <div className="text-sm text-muted-foreground">Total Clients</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-green-600">
            {mockClients.filter(c => c.status === 'active').length}
          </div>
          <div className="text-sm text-muted-foreground">Active Clients</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-blue-600">
            {mockClients.filter(c => c.type === 'business').length}
          </div>
          <div className="text-sm text-muted-foreground">Business Clients</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-purple-600">
            {mockClients.filter(c => c.type === 'individual').length}
          </div>
          <div className="text-sm text-muted-foreground">Individual Clients</div>
        </div>
      </div>

      {/* Client Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map(client => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">No clients found matching your criteria.</div>
        </div>
      )}
    </div>
  )
}