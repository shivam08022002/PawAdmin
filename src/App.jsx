import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import VolunteerBrandID from './pages/VolunteerBrandID.jsx'
import AdoptionRequest from './pages/AdoptionRequest.jsx'
import MedicalEmergencyRequest from './pages/MedicalEmergencyRequest.jsx'
import Tasks from './pages/Tasks.jsx'
import LostFound from './pages/LostFound.jsx'
import Sponsors from './pages/Sponsors.jsx'
import Notifications from './pages/Notifications.jsx'
import Profile from './pages/Profile.jsx'
import PawParent from './pages/manage/PawParent.jsx'
import Volunteer from './pages/manage/Volunteer.jsx'
import Shelter from './pages/manage/Shelter.jsx'
import Brand from './pages/manage/Brand.jsx'
import NGOs from './pages/manage/NGOs.jsx'
import AppLayout from './components/layout/AppLayout.jsx'
import './index.css'

function ProtectedLayout() {
  const auth = localStorage.getItem('cp_auth') === 'true'
  if (!auth) return <Navigate to="/" replace />
  return <Outlet />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedLayout />}>
        <Route element={<AppLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="id-requests" element={<VolunteerBrandID />} />
          <Route path="manage/pawparent" element={<PawParent />} />
          <Route path="manage/volunteer" element={<Volunteer />} />
          <Route path="manage/shelter" element={<Shelter />} />
          <Route path="manage/brand" element={<Brand />} />
          <Route path="manage/ngos" element={<NGOs />} />
          <Route path="adoption" element={<AdoptionRequest />} />
          <Route path="medical" element={<MedicalEmergencyRequest />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="lost-found" element={<LostFound />} />
          <Route path="sponsors" element={<Sponsors />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
