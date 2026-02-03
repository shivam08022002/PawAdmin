import { useEffect, useState } from 'react'
import './Page.css'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem('user')
    const storedRole = localStorage.getItem('role')
    
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    if (storedRole) {
      setRole(storedRole)
    }
  }, [])

  // Generate initials from user name
  const getInitials = (name) => {
    if (!name) return '?'
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('')
  }

  // Capitalize role
  const capitalizeRole = (role) => {
    if (!role) return ''
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
  }

  return (
    <div className="page" style={{ maxWidth: 480, margin: '0 auto', paddingTop: 20 }}>
      <div className="card" style={{ padding: 32, display: 'grid', gap: 28 }}>
        {/* Profile Header */}
        <div style={{ display: 'grid', gap: 16, alignItems: 'center', textAlign: 'center' }}>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #e5edff 0%, #d0dfff 100%)',
              display: 'grid',
              placeItems: 'center',
              fontSize: 40,
              fontWeight: 900,
              color: '#1f50c1',
              margin: '0 auto',
              boxShadow: '0 8px 24px rgba(31, 80, 193, 0.12)',
            }}
          >
            {getInitials(user?.name)}
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 24, color: 'var(--text)', marginBottom: 4 }}>
              {user?.name || 'Loading...'}
            </div>
            <div
              style={{
                background: '#f0f4ff',
                color: '#1f50c1',
                padding: '4px 12px',
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 600,
                display: 'inline-block',
              }}
            >
              {capitalizeRole(role || user?.role)}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--border)' }} />

        {/* Contact Information */}
        <div style={{ display: 'grid', gap: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Contact Information
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>Email</span>
              <span style={{ fontSize: 14, color: 'var(--text)' }}>{user?.email || 'N/A'}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>Status</span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 14,
                  color: user?.isVerified ? '#10b981' : '#f59e0b',
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: user?.isVerified ? '#10b981' : '#f59e0b' }} />
                {user?.isVerified ? 'Verified' : 'Unverified'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
