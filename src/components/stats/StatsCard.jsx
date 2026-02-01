import './StatsCard.css'

export default function StatsCard({ icon, label, value, color = 'blue' }) {
  return (
    <div className={`stats-card ${color}`}>
      <div className="stats-head">
        <div className="stats-icon">{icon}</div>
        <span className="stats-label">{label}</span>
      </div>
      <div className="stats-value">{value}</div>
    </div>
  )
}

