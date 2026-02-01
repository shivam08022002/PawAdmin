import '../Page.css'

export default function Volunteer() {
  const items = [
    { name: 'Sarah Johnson', skills: 'Field Rescue', status: 'Active' },
    { name: 'David Lee', skills: 'Foster Care', status: 'Active' },
  ]
  return (
    <div className="page">
      <h2 className="page-title">Manage Volunteer</h2>
      <div className="card list-card">
        {items.map((i) => (
          <div key={i.name} className="list-row list-row-3">
            <div>{i.name}</div>
            <div className="list-meta">{i.skills}</div>
            <div className="list-meta">{i.status}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
