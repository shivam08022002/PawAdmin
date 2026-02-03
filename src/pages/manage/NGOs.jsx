import './table.css'

export default function NGOs() {
  const items = [
    { name: 'Animal Aid', city: 'Jaipur', status: 'Partner' },
    { name: 'Friendicoes', city: 'Delhi', status: 'Partner' },
  ]
  return (
    <div className="page">
      <h2 className="page-title">Manage NGOs</h2>
      <div className="card table-card">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.name}>
                <td className="font-medium">{i.name}</td>
                <td>{i.city}</td>
                <td>
                  <span className="status-badge success">{i.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
