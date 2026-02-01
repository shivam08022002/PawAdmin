import './Header.css'
import { Link, useLocation } from 'react-router-dom'
import { Bell, Menu, ChevronRight } from 'lucide-react'
import PawLogo from '../logo/PawLogo.jsx'

export default function Header({ onMenuClick }) {
  const location = useLocation()
  const parts = location.pathname.split('/').filter(Boolean)
  const labelMap = {
    dashboard: 'Dashboard',
    'id-requests': 'ID Requests',
    manage: 'Manage Users',
    pawparent: 'PawParent',
    volunteer: 'Volunteer',
    shelter: 'Shelter',
    brand: 'Brand',
    ngos: 'NGOs',
    adoption: 'Adoption',
    medical: 'Medical',
    tasks: 'Tasks',
    'lost-found': 'Lost & Found',
    sponsors: 'Sponsors',
    notifications: 'Notifications',
    profile: 'Profile',
  }
  const crumbs = [
    { label: 'Home', to: '/dashboard' },
    ...parts.map((p, i) => {
      const to = '/' + parts.slice(0, i + 1).join('/')
      const label =
        labelMap[p] ??
        p
          .replace('-', ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase())
      return { label, to }
    }),
  ]
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuClick} aria-label="Toggle Menu">
          <Menu size={24} />
        </button>
        <Link to="/dashboard" className="header-brand-mobile">
          <PawLogo size={34} />
          <div className="header-brand-text">
            <span className="header-brand-title">Connecting Paws</span>
            <span className="header-brand-sub">Admin Dashboard</span>
          </div>
        </Link>
        <div className="brand">
          <h2 className="header-title">Admin Dashboard</h2>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <span key={c.to} className="crumb">
                <Link to={c.to}>{c.label}</Link>
                {i < crumbs.length - 1 && <ChevronRight size={14} className="crumb-sep" />}
              </span>
            ))}
          </nav>
        </div>
      </div>

      <div className="actions">
        <button className="icon-btn" aria-label="Notifications">
          <span className="dot"></span>
          <Bell size={20} />
        </button>
        <Link to="/profile" className="avatar">
          <img src="https://ui-avatars.com/api/?name=John+Doe&background=2563EB&color=fff" alt="Profile" />
        </Link>
      </div>
    </header>
  )
}
