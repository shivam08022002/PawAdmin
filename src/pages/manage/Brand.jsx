import '../Page.css'

export default function Brand() {
  const items = [
    { name: 'PetCare Brands', category: 'Food', status: 'Approved' },
    { name: 'PawGear', category: 'Accessories', status: 'Pending' },
  ]
  return (
    <div className="page">
      <h2 className="page-title">Manage Brand</h2>
      <div className="card list-card">
        {items.map((i) => (
          <div key={i.name} className="list-row list-row-3">
            <div>{i.name}</div>
            <div className="list-meta">{i.category}</div>
            <div className="list-meta">{i.status}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
