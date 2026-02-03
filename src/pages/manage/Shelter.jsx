import { useEffect, useState } from 'react'
import { getAllShelters } from '../../services/apiServices'
import './table.css'

export default function Shelter() {
  const [shelters, setShelters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchShelters()
  }, [])

  const fetchShelters = async () => {
    try {
      setLoading(true)
      const data = await getAllShelters()
      setShelters(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      console.error('Error fetching shelters:', err)
      setError('Failed to load shelters')
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
      <h2 className="page-title">Manage Shelter</h2>
      <div className="card table-card">
        <table className="custom-table">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Representative</th>
              <th>Shelter Name</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Created</th>
              <th>Verified</th>
            </tr>
          </thead>
          <tbody>
            {shelters.length > 0 ? (
              shelters.map((shelter, index) => (
                <tr key={shelter._id}>
                  <td>{index + 1}</td>
                  <td>{shelter.representativeName || 'N/A'}</td>
                  <td className="font-medium">{shelter.shelterName || 'N/A'}</td>
                  <td>{shelter.shelterLocation || 'N/A'}</td>
                  <td className="text-center font-medium">{shelter.shelterCapacity || 'N/A'}</td>
                  <td className="text-muted">{formatDateTime(shelter.createdAt)}</td>
                  <td>
                    <span className={`status-badge ${shelter.isVerified ? 'success' : 'error'}`}>
                      {shelter.isVerified ? '✓ Yes' : '✗ No'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="table-empty">
                  No shelters found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
