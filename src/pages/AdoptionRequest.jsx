import { useEffect, useState } from 'react'
import DataTable from '../components/table/DataTable.jsx'
import { getAdoptionRequests } from '../services/apiServices.js'
import './Page.css'

export default function AdoptionRequest() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAdoptionRequests = async () => {
      try {
        setLoading(true)
        const data = await getAdoptionRequests()
        
        // Map API response to table rows
        const mappedRows = data.map(request => ({
          id: request._id,
          breed: request.breed || 'Unknown',
          applicant: request.ownerId?.name || 'Unknown',
          vaccinations: request.vaccinations || 'N/A',
          availableFrom: new Date(request.availableFrom).toLocaleDateString(),
          availableTo: new Date(request.availableTo).toLocaleDateString(),
          status: request.status || 'pending',
          createdAt: new Date(request.createdAt).toLocaleDateString(),
        }))
        
        setRows(mappedRows)
        setError(null)
      } catch (err) {
        console.error('Error fetching adoption requests:', err)
        setError('Failed to fetch adoption requests')
      } finally {
        setLoading(false)
      }
    }

    fetchAdoptionRequests()
  }, [])

  const columns = [
    { key: 'breed', label: 'Breed' },
    { key: 'applicant', label: 'Owner Name' },
    { key: 'vaccinations', label: 'Vaccinations' },
    { key: 'availableFrom', label: 'Available From' },
    { key: 'availableTo', label: 'Available To' },
    { key: 'status', label: 'Status', render: (v) => (
      <span className={`badge ${v.toLowerCase()}`}>{v === 'review' ? 'Under Review' : v[0].toUpperCase()+v.slice(1)}</span>
    ) },
    { key: 'createdAt', label: 'Created Date' },
  ]

  if (loading) {
    return (
      <div className="page">
        <h2 className="page-title">Adoption Request</h2>
        <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page">
        <h2 className="page-title">Adoption Request</h2>
        <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>{error}</div>
      </div>
    )
  }

  return (
    <div className="page">
      <h2 className="page-title">Adoption Request</h2>
      <DataTable title="Requests" columns={columns} rows={rows} />
    </div>
  )
}
