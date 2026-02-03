import { useEffect, useState } from 'react'
import { getAllBrands } from '../../services/apiServices'
import './table.css'

export default function Brand() {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBrands()
  }, [])

  const fetchBrands = async () => {
    try {
      setLoading(true)
      const data = await getAllBrands()
      setBrands(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      console.error('Error fetching brands:', err)
      setError('Failed to load brands')
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
      <h2 className="page-title">Manage Brand</h2>
      <div className="card table-card">
        <table className="custom-table">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Representative</th>
              <th>Brand Name</th>
              <th>Website</th>
              <th>Created</th>
              <th>Verified</th>
              <th>Approved</th>
            </tr>
          </thead>
          <tbody>
            {brands.length > 0 ? (
              brands.map((brand, index) => (
                <tr key={brand._id}>
                  <td>{index + 1}</td>
                  <td>{brand.representativeName || 'N/A'}</td>
                  <td className="font-medium">{brand.brandName || 'N/A'}</td>
                  <td>
                    <a href={brand.website} target="_blank" rel="noopener noreferrer" className="table-link">
                      {brand.website ? brand.website.replace('https://', '') : 'N/A'}
                    </a>
                  </td>
                  <td className="text-muted">{formatDateTime(brand.createdAt)}</td>
                  <td>
                    <span className={`status-badge ${brand.isVerified ? 'success' : 'error'}`}>
                      {brand.isVerified ? '✓ Yes' : '✗ No'}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${brand.isApproved ? 'success' : 'error'}`}>
                      {brand.isApproved ? '✓ Yes' : '✗ No'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="table-empty">
                  No brands found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
