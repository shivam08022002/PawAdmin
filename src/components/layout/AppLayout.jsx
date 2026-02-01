import { Outlet } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar.jsx'
import Header from '../header/Header.jsx'
import './AppLayout.css'
import { useState } from 'react'

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="content-body">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

