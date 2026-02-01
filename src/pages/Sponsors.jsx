import './Page.css'

export default function Sponsors() {
  const sponsors = [
    { name: 'PetCare Brands', tier: 'Gold', contribution: '₹50,000/mo' },
    { name: 'Happy Tails Shelter', tier: 'Silver', contribution: '₹20,000/mo' },
    { name: 'VetWell Clinic', tier: 'Bronze', contribution: '₹10,000/mo' },
  ]
  return (
    <div className="page sponsors-grid">
      <div className="col-full">
        <h2 className="page-title">Sponsors</h2>
      </div>
      {sponsors.map((s) => (
        <div key={s.name} className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong>{s.name}</strong>
            <span className="badge approved">{s.tier}</span>
          </div>
          <div className="list-meta" style={{ marginTop: 8 }}>Contribution</div>
          <div style={{ fontWeight: 700 }}>{s.contribution}</div>
        </div>
      ))}
    </div>
  )
}
