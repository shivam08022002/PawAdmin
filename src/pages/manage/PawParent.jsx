import { useEffect, useState } from 'react'
import { getAllPawParents } from '../../services/apiServices'
import './table.css'

export default function PawParent() {
  const [pawParents, setPawParents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPawParents()
  }, [])

  const fetchPawParents = async () => {
    try {
      setLoading(true)
      const data = await getAllPawParents()
      setPawParents(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      console.error('Error fetching paw parents:', err)
      setError('Failed to load paw parents')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="page"><div className="card">Loading...</div></div>
  if (error) return <div className="page"><div className="card error-message">{error}</div></div>

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <div className="page">
      <h2 className="page-title">Manage PawParent</h2>
      <div className="card table-card">
        <table className="custom-table">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Name</th>
              <th>Email</th>
              <th>Verified</th>
              <th>Created Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {pawParents.length > 0 ? (
              pawParents.map((parent, index) => (
                <tr key={parent._id}>
                  <td>{index + 1}</td>
                  <td className="font-medium">{parent.name || 'N/A'}</td>
                  <td>{parent.email || 'N/A'}</td>
                  <td>
                    <span className={`status-badge ${parent.isVerified ? 'success' : 'error'}`}>
                      {parent.isVerified ? '✓ Yes' : '✗ No'}
                    </span>
                  </td>
                  <td className="text-muted">{formatDateTime(parent.createdAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="table-empty">
                  No paw parents found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
