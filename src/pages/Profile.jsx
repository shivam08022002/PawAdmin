import './Page.css'

export default function Profile() {
  return (
    <div className="page profile-grid">
      <div>
        <div className="card" style={{ padding: 16, display: 'grid', gap: 10 }}>
          <div style={{ width: 96, height: 96, borderRadius: '50%', background: '#e5edff', display: 'grid', placeItems: 'center', fontSize: 28, fontWeight: 800, color: '#1f50c1' }}>JP</div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>Jane Patel</div>
          <div style={{ color: 'var(--muted)' }}>Administrator</div>
          <button className="btn">Edit Profile</button>
        </div>
      </div>
      <div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <div className="page-title" style={{ fontSize: 16 }}>Contact</div>
            <div>Email: jane@connectingpaws.org</div>
            <div>Phone: +91 98765 43210</div>
            <div>Location: Chandigarh</div>
          </div>
        </div>
      </div>
    </div>
  )
}
