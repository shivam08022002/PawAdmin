import '../Page.css'

export default function NGOs() {
  const items = [
    { name: 'Animal Aid', city: 'Jaipur', status: 'Partner' },
    { name: 'Friendicoes', city: 'Delhi', status: 'Partner' },
  ]
  return (
    <div className="page">
      <h2 className="page-title">Manage NGOs</h2>
      <div className="card list-card">
        {items.map((i) => (
          <div key={i.name} className="list-row list-row-3">
            <div>{i.name}</div>
            <div className="list-meta">{i.city}</div>
            <div className="list-meta">{i.status}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
