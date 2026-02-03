import { useEffect, useState } from 'react'
import StatsCard from '../components/stats/StatsCard.jsx'
import DataTable from '../components/table/DataTable.jsx'
import LineChart from '../components/charts/LineChart.jsx'
import PieChart from '../components/charts/PieChart.jsx'
import { getDashboardStats } from '../services/apiServices'
import './Dashboard.css'
import { Activity, ClipboardList, Heart, Users } from 'lucide-react'

const idColumns = [
  { key: 'name', label: 'Name' },
  { key: 'type', label: 'Type' },
  { key: 'status', label: 'Status', render: (v) => (
    <span className={`badge ${v.toLowerCase()}`}>{v[0].toUpperCase()+v.slice(1)}</span>
  ) },
  { key: 'date', label: 'Date' },
]
const idRows = [
  { name: 'Sarah Johnson', type: 'Volunteer', status: 'pending', date: '02/14/2024' },
  { name: 'Happy Tails Shelter', type: 'Shelter', status: 'approved', date: '02/12/2024' },
  { name: 'PetCare Brands', type: 'Brand', status: 'pending', date: '02/10/2024' },
]

const adoptionColumns = [
  { key: 'pet', label: 'Pet Name' },
  { key: 'applicant', label: 'Applicant' },
  { key: 'status', label: 'Status', render: (v) => (
    <span className={`badge ${v.toLowerCase()}`}>{v === 'review' ? 'Under Review' : v[0].toUpperCase()+v.slice(1)}</span>
  ) },
  { key: 'date', label: 'Date' },
]
const adoptionRows = [
  { pet: 'Buddy', applicant: 'John Smith', status: 'review', date: '02/13/2024' },
  { pet: 'Mittens', applicant: 'Lisa Carter', status: 'pending', date: '02/11/2024' },
  { pet: 'Rex', applicant: 'David Lee', status: 'approved', date: '02/09/2024' },
]

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingAdoptions: 0,
    emergencyCases: 0,
    openTasks: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const data = await getDashboardStats()
      setStats(data)
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dashboard-grid">
      <div className="col-12">
        <h2 className="dash-title">Admin Dashboard</h2>
      </div>
      <div className="col-3">
        <StatsCard icon={<Users size={18} />} label="Total Users" value={stats.totalUsers.toLocaleString()} color="blue" />
      </div>
      <div className="col-3">
        <StatsCard icon={<Heart size={18} />} label="Pending Adoptions" value={stats.pendingAdoptions.toLocaleString()} color="green" />
      </div>
      <div className="col-3">
        <StatsCard icon={<Activity size={18} />} label="Emergency Cases" value={stats.emergencyCases.toLocaleString()} color="red" />
      </div>
      <div className="col-3">
        <StatsCard icon={<ClipboardList size={18} />} label="Open Tasks" value={stats.openTasks.toLocaleString()} color="orange" />
      </div>

      <div className="col-6">
        <DataTable title="Recent ID Requests" columns={idColumns} rows={idRows} actionLabel="View All" />
      </div>
      <div className="col-6">
        <DataTable title="Adoption Requests" columns={adoptionColumns} rows={adoptionRows} actionLabel="View All" />
      </div>

      <div className="col-7">
        <LineChart />
      </div>
      <div className="col-5">
        <PieChart title="Task Overview" />
      </div>

      
    </div>
  )
}
