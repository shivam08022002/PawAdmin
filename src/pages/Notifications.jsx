import './Page.css'

export default function Notifications() {
  const items = [
    { title: 'New Adoption Request', time: '2h ago', type: 'info' },
    { title: 'Emergency Case Assigned', time: '5h ago', type: 'success' },
    { title: 'Task Overdue', time: '1d ago', type: 'warning' },
  ]
  return (
    <div className="page">
      <h2 className="page-title">Notifications</h2>
      <div className="card list-card">
        {items.map((n, i) => (
          <div key={i} className="list-row list-row-notif">
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                background:
                  n.type === 'success'
                    ? 'var(--success)'
                    : n.type === 'warning'
                      ? 'var(--warning)'
                      : 'var(--primary)',
                display: 'inline-block',
              }}
            />
            <div>{n.title}</div>
            <div className="list-meta">{n.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
