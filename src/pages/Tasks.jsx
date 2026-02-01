import DataTable from '../components/table/DataTable.jsx'
import './Page.css'

export default function Tasks() {
  const columns = [
    { key: 'task', label: 'Task' },
    { key: 'assignee', label: 'Assignee' },
    { key: 'status', label: 'Status', render: (v) => (
      <span className={`badge ${v.toLowerCase()}`}>{v[0].toUpperCase()+v.slice(1)}</span>
    ) },
    { key: 'due', label: 'Due' },
  ]
  const rows = [
    { task: 'Verify shelter documents', assignee: 'Asha', status: 'pending', due: '02/20/2024' },
    { task: 'Call Vet partner', assignee: 'Vikram', status: 'approved', due: '02/18/2024' },
    { task: 'Update adoption listing', assignee: 'Neha', status: 'pending', due: '02/19/2024' },
  ]
  return (
    <div className="page">
      <h2 className="page-title">Assign & Completed Tasks</h2>
      <DataTable title="Tasks" columns={columns} rows={rows} />
    </div>
  )
}
