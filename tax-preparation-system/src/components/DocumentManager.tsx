import React, { useState } from 'react'
import { 
  Upload, 
  FileText, 
  Download, 
  Eye, 
  Trash2, 
  Search,
  Calendar,
  User
} from 'lucide-react'

interface Document {
  id: string
  name: string
  type: string
  client: string
  uploadDate: string
  size: string
  status: 'pending' | 'reviewed' | 'approved'
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'W-2_Form_2023.pdf',
    type: 'W-2',
    client: 'John Smith',
    uploadDate: '2024-03-10',
    size: '2.4 MB',
    status: 'reviewed'
  },
  {
    id: '2',
    name: '1099_INT_2023.pdf',
    type: '1099-INT',
    client: 'Jane Doe',
    uploadDate: '2024-03-08',
    size: '1.8 MB',
    status: 'pending'
  },
  {
    id: '3',
    name: 'Business_Expenses_2023.xlsx',
    type: 'Expense Report',
    client: 'ABC Corporation',
    uploadDate: '2024-03-05',
    size: '5.2 MB',
    status: 'approved'
  }
]

const DocumentCard: React.FC<{ document: Document }> = ({ document }) => (
  <div className="card p-4 hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-medium text-foreground truncate">{document.name}</h3>
          <p className="text-sm text-muted-foreground">{document.type}</p>
        </div>
      </div>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        document.status === 'approved' ? 'bg-green-100 text-green-800' :
        document.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
        'bg-yellow-100 text-yellow-800'
      }`}>
        {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
      </span>
    </div>

    <div className="space-y-2 mb-4">
      <div className="flex items-center text-sm text-muted-foreground">
        <User className="w-4 h-4 mr-2" />
        {document.client}
      </div>
      <div className="flex items-center text-sm text-muted-foreground">
        <Calendar className="w-4 h-4 mr-2" />
        {document.uploadDate}
      </div>
      <div className="text-sm text-muted-foreground">
        Size: {document.size}
      </div>
    </div>

    <div className="flex space-x-2">
      <button className="flex-1 btn-secondary text-sm py-1 flex items-center justify-center space-x-1">
        <Eye className="w-4 h-4" />
        <span>View</span>
      </button>
      <button className="flex-1 btn-secondary text-sm py-1 flex items-center justify-center space-x-1">
        <Download className="w-4 h-4" />
        <span>Download</span>
      </button>
      <button className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  </div>
)

export const DocumentManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'reviewed' | 'approved'>('all')

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Document Manager</h1>
          <p className="text-muted-foreground">Upload, organize, and manage tax documents for your clients.</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Upload Area */}
      <div className="card p-8 border-2 border-dashed border-border hover:border-primary transition-colors">
        <div className="text-center">
          <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Upload Documents</h3>
          <p className="text-muted-foreground mb-4">Drag and drop files here, or click to select files</p>
          <button className="btn-primary">Choose Files</button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="input w-auto"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="approved">Approved</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="text-2xl font-bold text-foreground">{mockDocuments.length}</div>
          <div className="text-sm text-muted-foreground">Total Documents</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {mockDocuments.filter(d => d.status === 'pending').length}
          </div>
          <div className="text-sm text-muted-foreground">Pending Review</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-blue-600">
            {mockDocuments.filter(d => d.status === 'reviewed').length}
          </div>
          <div className="text-sm text-muted-foreground">Reviewed</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-green-600">
            {mockDocuments.filter(d => d.status === 'approved').length}
          </div>
          <div className="text-sm text-muted-foreground">Approved</div>
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map(document => (
          <DocumentCard key={document.id} document={document} />
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">No documents found matching your criteria.</div>
        </div>
      )}
    </div>
  )
}