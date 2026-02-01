import DataTable from '../components/table/DataTable.jsx'
import './Page.css'

export default function VolunteerBrandID() {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'type', label: 'Type' },
    { key: 'status', label: 'Status', render: (v) => (
      <span className={`badge ${v.toLowerCase()}`}>{v[0].toUpperCase()+v.slice(1)}</span>
    ) },
    { key: 'date', label: 'Date' },
  ]
  const rows = [
    { name: 'Sarah Johnson', type: 'Volunteer', status: 'pending', date: '02/14/2024' },
    { name: 'Happy Tails Shelter', type: 'Shelter', status: 'approved', date: '02/12/2024' },
    { name: 'PetCare Brands', type: 'Brand', status: 'pending', date: '02/10/2024' },
  ]
  return (
    <div className="page">
      <h2 className="page-title">Volunteer / Brands ID Request</h2>
      <DataTable title="ID Requests" columns={columns} rows={rows} />
    </div>
  )
}
