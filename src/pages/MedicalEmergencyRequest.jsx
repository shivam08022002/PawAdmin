import DataTable from '../components/table/DataTable.jsx'
import './Page.css'

export default function MedicalEmergencyRequest() {
  const columns = [
    { key: 'case', label: 'Case' },
    { key: 'location', label: 'Location' },
    { key: 'priority', label: 'Priority', render: (v) => (
      <span className={`badge ${v.toLowerCase()}`}>{v[0].toUpperCase()+v.slice(1)}</span>
    ) },
    { key: 'date', label: 'Date' },
  ]
  const rows = [
    { case: 'Dog hit by car', location: 'Sector 21', priority: 'pending', date: '02/15/2024' },
    { case: 'Cat fracture', location: 'Downtown', priority: 'approved', date: '02/12/2024' },
    { case: 'Puppy dehydration', location: 'East Park', priority: 'pending', date: '02/10/2024' },
  ]
  return (
    <div className="page">
      <h2 className="page-title">Medical Emergency Request</h2>
      <DataTable title="Emergency Cases" columns={columns} rows={rows} />
    </div>
  )
}
