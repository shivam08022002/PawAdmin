import { useEffect, useState } from 'react'
import { getAllVolunteers } from '../../services/apiServices'
import './table.css'

export default function Volunteer() {
  const [volunteers, setVolunteers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchVolunteers()
  }, [])

  const fetchVolunteers = async () => {
    try {
      setLoading(true)
      const data = await getAllVolunteers()
      setVolunteers(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      console.error('Error fetching volunteers:', err)
      setError('Failed to load volunteers')
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
      <h2 className="page-title">Manage Volunteer</h2>
      <div className="card table-card">
        <table className="custom-table">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Name</th>
              <th>Aadhar</th>
              <th>Answer</th>
              <th>Created</th>
              <th>Verified</th>
              <th>Approved</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.length > 0 ? (
              volunteers.map((volunteer, index) => (
                <tr key={volunteer._id}>
                  <td>{index + 1}</td>
                  <td className="font-medium">{volunteer.name || 'N/A'}</td>
                  <td>{volunteer.aadhar || 'N/A'}</td>
                  <td>
                    <span className="text-truncate" title={volunteer.questionAnswer}>
                      {volunteer.questionAnswer || 'N/A'}
                    </span>
                  </td>
                  <td className="text-muted">{formatDateTime(volunteer.createdAt)}</td>
                  <td>
                    <span className={`status-badge ${volunteer.isVerified ? 'success' : 'error'}`}>
                      {volunteer.isVerified ? '✓ Yes' : '✗ No'}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${volunteer.isApproved ? 'success' : 'error'}`}>
                      {volunteer.isApproved ? '✓ Yes' : '✗ No'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="table-empty">
                  No volunteers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
