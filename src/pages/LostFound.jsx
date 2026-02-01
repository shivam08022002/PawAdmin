import DataTable from '../components/table/DataTable.jsx'
import './Page.css'

export default function LostFound() {
  const columns = [
    { key: 'animal', label: 'Animal' },
    { key: 'status', label: 'Status', render: (v) => (
      <span className={`badge ${v.toLowerCase()}`}>{v[0].toUpperCase()+v.slice(1)}</span>
    ) },
    { key: 'location', label: 'Location' },
    { key: 'date', label: 'Date' },
  ]
  const rows = [
    { animal: 'Golden Retriever', status: 'pending', location: 'City Park', date: '02/14/2024' },
    { animal: 'Tabby Cat', status: 'approved', location: 'Sector 17', date: '02/12/2024' },
    { animal: 'Parrot', status: 'pending', location: 'Old Town', date: '02/10/2024' },
  ]
  return (
    <div className="page">
      <h2 className="page-title">Lost & Found</h2>
      <DataTable title="Reports" columns={columns} rows={rows} />
    </div>
  )
}
