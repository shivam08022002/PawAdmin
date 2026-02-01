import '../Page.css'

export default function Shelter() {
  const items = [
    { name: 'Happy Tails Shelter', capacity: 40, status: 'Verified' },
    { name: 'Safe Paws Home', capacity: 25, status: 'Pending' },
  ]
  return (
    <div className="page">
      <h2 className="page-title">Manage Shelter</h2>
      <div className="card list-card">
        {items.map((i) => (
          <div key={i.name} className="list-row list-row-3a">
            <div>{i.name}</div>
            <div className="list-meta">Capacity: {i.capacity}</div>
            <div className="list-meta">{i.status}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
