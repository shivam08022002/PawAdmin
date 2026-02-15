import { useEffect, useState } from 'react'
import { getSponsors } from '../services/apiServices'
import './Page.css'

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const totalSponsors = sponsors.length
  const totalAmount = sponsors.reduce((sum, s) => sum + (Number(s.amount) || 0), 0)

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value || 0)

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        setLoading(true)
        const data = await getSponsors()
        setSponsors(data.data || [])
        setError(null)
      } catch (err) {
        console.error('Failed to fetch sponsors', err)
        setError('Failed to load sponsors')
      } finally {
        setLoading(false)
      }
    }

    fetchSponsors()
  }, [])

  return (
    <div className="page sponsors-grid">
      <div className="col-full">
        <h2 className="page-title">Sponsors</h2>
      </div>

      {!loading && !error && (
        <div className="col-full">
          <div className="card sponsor-summary">
            <div className="sponsor-summary-main">
              <div>
                <div className="list-meta">Total Sponsorship</div>
                <div className="sponsor-summary-amount">
                  {formatCurrency(totalAmount)}
                </div>
              </div>
              <div className="sponsor-summary-metrics">
                <div>
                  <div className="list-meta">Active Sponsors</div>
                  <div className="sponsor-summary-count">{totalSponsors}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="card list-card">Loading sponsors...</div>
      )}

      {error && !loading && (
        <div className="card list-card" style={{ color: 'var(--danger)' }}>{error}</div>
      )}

      {!loading && !error && sponsors.map((s) => (
        <div key={s._id} className="card sponsor-card">
          <div className="sponsor-header">
            <div className="sponsor-header-left">
              <div className="sponsor-avatar">
                {(s.name || '?').charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-muted small">{s.email}</div>
              </div>
            </div>
            <div className="sponsor-amount">
              {formatCurrency(s.amount)}
            </div>
          </div>
          <div className="sponsor-message">{s.message}</div>
          <div className="sponsor-meta">
            <span className="text-muted small">
              {new Date(s.createdAt).toLocaleDateString('en-IN')}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
