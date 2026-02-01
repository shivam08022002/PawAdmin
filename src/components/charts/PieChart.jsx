import './Charts.css'

export default function PieChart({
  title = 'Task Overview',
  slices = [
    { label: 'Completed', value: 55, color: '#16a34a' },
    { label: 'In Progress', value: 30, color: '#f59e0b' },
    { label: 'Pending', value: 15, color: '#ef4444' },
  ],
}) {
  const total = slices.reduce((a, b) => a + b.value, 0)
  const radius = 70
  const cx = 90
  const cy = 90
  const starts = slices.map((_, i) =>
    slices.slice(0, i).reduce((a, b) => a + b.value, 0)
  )
  const arcs = slices.map((s, i) => {
    const start = starts[i] / total
    const end = (starts[i] + s.value) / total
    const startAngle = start * 2 * Math.PI
    const endAngle = end * 2 * Math.PI
    const x1 = cx + radius * Math.cos(startAngle)
    const y1 = cy + radius * Math.sin(startAngle)
    const x2 = cx + radius * Math.cos(endAngle)
    const y2 = cy + radius * Math.sin(endAngle)
    const largeArc = s.value / total > 0.5 ? 1 : 0
    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`
    return { d, color: s.color, label: s.label, value: s.value }
  })
  return (
    <div className="chart card">
      <div className="chart-head">
        <h3>{title}</h3>
      </div>
      <div className="chart-body pie">
        <svg viewBox="0 0 180 180" width="100%" height="220">
          {arcs.map((a) => (
            <path key={a.label} d={a.d} fill={a.color} />
          ))}
        </svg>
        <div className="legend">
          {slices.map((s) => (
            <div className="legend-item" key={s.label}>
              <span className="dot" style={{ background: s.color }}></span>
              <span>{s.label}</span>
              <span className="muted">{s.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
