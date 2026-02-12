import { useEffect, useState } from 'react'
import DataTable from '../components/table/DataTable.jsx'
import { getAllReports } from '../services/apiServices.js'
import './Page.css'

export default function StrayDogReports() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true)
        const data = await getAllReports()
        
        // Map API response to table rows
        const mappedRows = data.map(report => ({
          id: report._id,
          location: report.locationText || `${report.geoLocation?.lat}, ${report.geoLocation?.lng}`,
          reporter: report.reportedBy?.name || 'Unknown',
          description: report.description,
          status: report.status || 'pending',
          image: report.image,
          createdAt: new Date(report.createdAt).toLocaleDateString(),
        }))
        
        setRows(mappedRows)
        setError(null)
      } catch (err) {
        console.error('Error fetching reports:', err)
        setError('Failed to fetch stray dog reports')
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  const columns = [
    { key: 'location', label: 'Location' },
    { key: 'description', label: 'Description' },
    { key: 'reporter', label: 'Reported By' },
    { key: 'status', label: 'Status', render: (v) => (
      <span className={`badge ${v.toLowerCase()}`}>
        {v[0].toUpperCase() + v.slice(1)}
      </span>
    ) },
    { key: 'createdAt', label: 'Reported Date' },
  ]

  if (loading) {
    return (
      <div className="page">
        <h2 className="page-title">Stray Dogs Report</h2>
        <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page">
        <h2 className="page-title">Stray Dogs Report</h2>
        <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>{error}</div>
      </div>
    )
  }

  return (
    <div className="page">
      <h2 className="page-title">Stray Dogs Report</h2>
      <DataTable title="Reports" columns={columns} rows={rows} />
    </div>
  )
}
