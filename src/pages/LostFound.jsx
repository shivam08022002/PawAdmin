import { useEffect, useState } from 'react'
import { getLostAndFoundAdmin } from '../services/apiServices'
import './Page.css'

export default function LostFound() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLostFound = async () => {
      try {
        setLoading(true)
        const data = await getLostAndFoundAdmin()
        setItems(data.data || [])
        setError(null)
      } catch (err) {
        console.error('Failed to fetch lost & found items', err)
        setError('Failed to load lost & found reports')
      } finally {
        setLoading(false)
      }
    }

    fetchLostFound()
  }, [])

  return (
    <div className="page">
      <h2 className="page-title">Lost & Found</h2>
      {loading && (
        <div className="card list-card">Loading reports...</div>
      )}

      {error && !loading && (
        <div className="card list-card" style={{ color: 'var(--danger)' }}>{error}</div>
      )}

      {!loading && !error && (
        <div className="lost-found-grid">
          {items.map(item => (
            <div key={item._id} className="lost-found-card">
              <div className="lost-found-header">
                <span className={`lost-found-type ${item.type === 'Lost' ? 'lost' : 'found'}`}>
                  {item.type}
                </span>
                <span className="lost-found-date">
                  {new Date(item.createdAt).toLocaleDateString('en-IN')}
                </span>
              </div>
              <div className="lost-found-title">{item.petName}</div>
              <div className="lost-found-description">{item.description}</div>
              <div className="lost-found-meta">
                <div className="lost-found-row">
                  <span className="lost-found-icon">📍</span>
                  <span>{item.location}</span>
                </div>
                <div className="lost-found-row">
                  <span className="lost-found-icon">👤</span>
                  <span>{item.createdBy?.name}</span>
                </div>
              </div>
              <div className="lost-found-photo">
                {item.photo ? (
                  <img
                    src={item.photo.startsWith('http') ? item.photo : `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/${item.photo}`}
                    alt={item.petName}
                  />
                ) : (
                  <div className="lost-found-photo-placeholder" />
                )}
              </div>
              <div className="lost-found-status">
                <span className="badge active-badge">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
