import '../Page.css'

export default function PawParent() {
  const items = [
    { name: 'Ravi Kumar', pets: 2, status: 'Active' },
    { name: 'Sunita Devi', pets: 1, status: 'Inactive' },
  ]
  return (
    <div className="page">
      <h2 className="page-title">Manage PawParent</h2>
      <div className="card list-card">
        {items.map((i) => (
          <div key={i.name} className="list-row list-row-3a">
            <div>{i.name}</div>
            <div className="list-meta">Pets: {i.pets}</div>
            <div className="list-meta">{i.status}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
