import './Charts.css'

export default function LineChart({ points = [2,4,3,5,3,7,6] }) {
  const max = Math.max(...points) || 1
  const w = 560
  const h = 200
  const stepX = w / (points.length - 1)
  const path = points
    .map((v, i) => {
      const x = i * stepX
      const y = h - (v / max) * (h - 28)
      return `${i === 0 ? 'M' : 'L'}${x},${y}`
    })
    .join(' ')
  return (
    <div className="chart card">
      <div className="chart-head">
        <h3>Emergency Cases Overview</h3>
      </div>
      <div className="chart-body">
        <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="220">
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity=".45"/>
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d={path} fill="none" stroke="#2563eb" strokeWidth="2" />
          <path d={`${path} L ${w},${h} L 0,${h} Z`} fill="url(#grad)" />
          {points.map((v, i) => {
            const x = i * stepX
            const y = h - (v / max) * (h - 28)
            return <circle key={i} cx={x} cy={y} r="3" fill="#1f50c1" />
          })}
        </svg>
      </div>
    </div>
  )
}
