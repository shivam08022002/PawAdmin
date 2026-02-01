import DataTable from '../components/table/DataTable.jsx'
import './Page.css'

export default function AdoptionRequest() {
  const columns = [
    { key: 'pet', label: 'Pet Name' },
    { key: 'applicant', label: 'Applicant' },
    { key: 'status', label: 'Status', render: (v) => (
      <span className={`badge ${v.toLowerCase()}`}>{v === 'review' ? 'Under Review' : v[0].toUpperCase()+v.slice(1)}</span>
    ) },
    { key: 'date', label: 'Date' },
  ]
  const rows = [
    { pet: 'Buddy', applicant: 'John Smith', status: 'review', date: '02/13/2024' },
    { pet: 'Mittens', applicant: 'Lisa Carter', status: 'pending', date: '02/11/2024' },
    { pet: 'Rex', applicant: 'David Lee', status: 'approved', date: '02/09/2024' },
  ]
  return (
    <div className="page">
      <h2 className="page-title">Adoption Request</h2>
      <DataTable title="Requests" columns={columns} rows={rows} />
    </div>
  )
}
