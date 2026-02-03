import { useEffect, useState } from 'react'
import DataTable from '../components/table/DataTable.jsx'
import Modal from '../components/common/Modal.jsx'
import { getPendingUsers, approveUser } from '../services/apiServices'
import './Page.css'

export default function VolunteerBrandID() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('volunteer')
  const [actionLoading, setActionLoading] = useState(null)
  const [confirmModal, setConfirmModal] = useState({ open: false, userId: null })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const data = await getPendingUsers()
      setUsers(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      console.error('Error fetching pending users:', err)
      setError('Failed to load requests')
    } finally {
      setLoading(false)
    }
  }

  const handleApproveClick = (userId) => {
    setConfirmModal({ open: true, userId })
  }

  const handleConfirmApprove = async () => {
    const userId = confirmModal.userId
    if (!userId) return

    try {
      setActionLoading(userId)
      setConfirmModal({ open: false, userId: null }) // Close modal immediately
      await approveUser(userId)
      // Refresh the list after approval
      await fetchUsers()
    } catch (err) {
      console.error('Error approving user:', err)
      alert('Failed to approve user')
    } finally {
      setActionLoading(null)
    }
  }

  const formatDateTime = (date) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  const volunteerColumns = [
    { key: 'name', label: 'Name', render: (_, r) => r.name || r.profileId?.name || 'N/A' },
    { key: 'email', label: 'Email' },
    { key: 'aadhar', label: 'Aadhar', render: (_, r) => r.profileId?.aadhar || 'N/A' },
    { key: 'status', label: 'Status', render: (v, r) => (
      <span className={`badge ${r.isVerified ? 'success' : 'pending'}`}>
        {r.isVerified ? 'Verified' : 'Pending'}
      </span>
    ) },
    { key: 'createdAt', label: 'Date', render: (v) => formatDateTime(v) },
    { key: 'action', label: 'Action', render: (_, r) => (
      !r.isVerified && (
        <button 
          className="btn-approve"
          onClick={() => handleApproveClick(r._id)}
          disabled={actionLoading === r._id}
        >
          {actionLoading === r._id ? 'Processing...' : 'Approve'}
        </button>
      )
    ) },
  ]

  const brandColumns = [
    { key: 'brandName', label: 'Brand Name', render: (_, r) => r.profileId?.brandName || 'N/A' },
    { key: 'repName', label: 'Representative', render: (_, r) => r.profileId?.representativeName || r.name || 'N/A' },
    { key: 'website', label: 'Website', render: (_, r) => (
      r.profileId?.website ? (
        <a href={r.profileId.website.startsWith('http') ? r.profileId.website : `https://${r.profileId.website}`} target="_blank" rel="noopener noreferrer" className="table-link">
          {r.profileId.website.replace(/^https?:\/\//, '')}
        </a>
      ) : 'N/A'
    ) },
    { key: 'status', label: 'Status', render: (v, r) => (
      <span className={`badge ${r.isVerified ? 'success' : 'pending'}`}>
        {r.isVerified ? 'Verified' : 'Pending'}
      </span>
    ) },
    { key: 'createdAt', label: 'Date', render: (v) => formatDateTime(v) },
    { key: 'action', label: 'Action', render: (_, r) => (
      !r.isVerified && (
        <button 
          className="btn-approve"
          onClick={() => handleApproveClick(r._id)}
          disabled={actionLoading === r._id}
        >
          {actionLoading === r._id ? 'Processing...' : 'Approve'}
        </button>
      )
    ) },
  ]

  const filteredRows = users.filter(u => u.role === activeTab)

  return (
    <div className="page">
      <h2 className="page-title">Volunteer / Brands ID Request</h2>
      
      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'volunteer' ? 'active' : ''}`}
          onClick={() => setActiveTab('volunteer')}
        >
          Volunteer ID Requests
        </button>
        <button 
          className={`tab-btn ${activeTab === 'brand' ? 'active' : ''}`}
          onClick={() => setActiveTab('brand')}
        >
          Brand ID Requests
        </button>
      </div>

      {loading ? (
        <div className="card list-card">Loading...</div>
      ) : error ? (
        <div className="card list-card" style={{color: 'var(--danger)'}}>{error}</div>
      ) : (
        <DataTable 
          title={`${activeTab === 'volunteer' ? 'Volunteer' : 'Brand'} ID Requests`} 
          columns={activeTab === 'volunteer' ? volunteerColumns : brandColumns} 
          rows={filteredRows} 
        />
      )}

      <Modal
        isOpen={confirmModal.open}
        onClose={() => setConfirmModal({ open: false, userId: null })}
        title="Approve User Request"
        footer={
          <>
            <button 
              className="btn-secondary" 
              onClick={() => setConfirmModal({ open: false, userId: null })}
            >
              Cancel
            </button>
            <button 
              className="btn-primary" 
              onClick={handleConfirmApprove}
            >
              Confirm Approval
            </button>
          </>
        }
      >
        <p>Are you sure you want to approve this user?</p>
      </Modal>
    </div>
  )
}
