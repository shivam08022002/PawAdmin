import { Link, NavLink } from 'react-router-dom'
import { useMemo, useState } from 'react'
import PawLogo from '../logo/PawLogo.jsx'
import './Sidebar.css'
import {
  Activity,
  Bell,
  Briefcase,
  Building,
  ChevronDown,
  CreditCard,
  Handshake,
  Heart,
  Home,
  LayoutDashboard,
  LogOut,
  Search,
  Shield,
  User,
  UserCheck,
  Users,
  ClipboardList,
  AlertCircle,
} from 'lucide-react'

function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}

export default function Sidebar({ isOpen = false, onClose }) {
  const [manageOpen, setManageOpen] = useState(false)

  const items = useMemo(
    () => [
      { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/id-requests', label: 'Login ID Request', icon: CreditCard },
      {
        type: 'group',
        label: 'Manage Users',
        icon: Users,
        children: [
          { to: '/manage/pawparent', label: 'PawParent', icon: UserCheck },
          { to: '/manage/volunteer', label: 'Volunteer', icon: Shield },
          { to: '/manage/shelter', label: 'Shelter', icon: Home },
          { to: '/manage/brand', label: 'Brand', icon: Briefcase },
          { to: '/manage/ngos', label: 'NGOs', icon: Building },
        ],
      },
      { to: '/adoption', label: 'Adoption Request', icon: Heart },
      { to: '/stray-dogs', label: 'Stray Dogs Report', icon: AlertCircle },
      { to: '/medical', label: 'Medical Request', icon: Activity },
      { to: '/tasks', label: 'Tasks', icon: ClipboardList },
      { to: '/lost-found', label: 'Lost & Found', icon: Search },
      { to: '/sponsors', label: 'Sponsors', icon: Handshake },
      { to: '/notifications', label: 'Notifications', icon: Bell },
      { to: '/profile', label: 'Profile', icon: User },
    ],
    []
  )

  const closeIfMobile = () => {
    if (window.innerWidth <= 1024) onClose?.()
  }

  return (
    <>
      <div
        className={cx('sidebar-overlay', isOpen && 'open')}
        onClick={() => onClose?.()}
      />

      <aside className={cx('sidebar', isOpen && 'open')}>
        <div className="sidebar-header">
          <Link to="/dashboard" className="sidebar-brand" onClick={closeIfMobile}>
            <PawLogo size={40} />
            <div className="brand-text">
              <span className="brand-title">Connecting Paws</span>
              <span className="brand-sub">Admin Dashboard</span>
            </div>
          </Link>
        </div>

        <nav className="nav">
          <div className="nav-group">
            {items.map(item => {
              if (item.type === 'group') {
                const GroupIcon = item.icon

                return (
                  <div key={item.label}>
                    <button
                      type="button"
                      className={cx(
                        'nav-item',
                        'collapsible',
                        manageOpen && 'active'
                      )}
                      onClick={() => setManageOpen(v => !v)}
                    >
                      <GroupIcon size={20} className="nav-ico" />
                      <span>{item.label}</span>
                      <ChevronDown
                        size={16}
                        className={cx('chev', manageOpen && 'rotate')}
                      />
                    </button>

                    <div
                      className={cx(
                        'submenu',
                        manageOpen && 'submenu-open'
                      )}
                    >
                      {item.children.map(c => {
                        const ChildIcon = c.icon
                        return (
                          <NavLink
                            key={c.to}
                            to={c.to}
                            className={({ isActive }) =>
                              cx('submenu-item', isActive && 'active')
                            }
                            onClick={closeIfMobile}
                          >
                            <ChildIcon size={16} />
                            <span>{c.label}</span>
                          </NavLink>
                        )
                      })}
                    </div>
                  </div>
                )
              }

              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cx('nav-item', isActive && 'active')
                  }
                  onClick={closeIfMobile}
                >
                  <Icon size={20} className="nav-ico" />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </div>

          <div className="nav-footer">
            <Link
              to="/"
              className="nav-item logout"
              onClick={() => {
                localStorage.removeItem('cp_auth')
                closeIfMobile()
              }}
            >
              <LogOut size={20} className="nav-ico" />
              <span>Logout</span>
            </Link>
          </div>
        </nav>
      </aside>
    </>
  )
}
