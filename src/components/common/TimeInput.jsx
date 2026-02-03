import { useEffect, useState } from 'react'
import './TimeInput.css'

export default function TimeInput({ value, onChange, name }) {
  const [time, setTime] = useState({
    hour: '12',
    minute: '00',
    period: 'AM'
  })

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(':')
      let hour = parseInt(h, 10)
      const period = hour >= 12 ? 'PM' : 'AM'
      
      if (hour > 12) hour -= 12
      if (hour === 0) hour = 12
      
      setTime({
        hour: hour.toString().padStart(2, '0'),
        minute: m,
        period
      })
    }
  }, [value])

  const handleChange = (field, val) => {
    const newTime = { ...time, [field]: val }
    setTime(newTime)

    // Convert to 24h format for parent
    let hourInt = parseInt(newTime.hour, 10)
    if (newTime.period === 'PM' && hourInt !== 12) {
      hourInt += 12
    } else if (newTime.period === 'AM' && hourInt === 12) {
      hourInt = 0
    }

    const hourStr = hourInt.toString().padStart(2, '0')
    onChange({ target: { name, value: `${hourStr}:${newTime.minute}` } })
  }

  // Generate options
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'))
  const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0')) // 5 min steps

  return (
    <div className="time-input-container">
      <select 
        className="time-select"
        value={time.hour}
        onChange={(e) => handleChange('hour', e.target.value)}
      >
        {hours.map(h => <option key={h} value={h}>{h}</option>)}
      </select>
      <span className="time-separator">:</span>
      <select 
        className="time-select"
        value={time.minute}
        onChange={(e) => handleChange('minute', e.target.value)}
      >
        {minutes.map(m => <option key={m} value={m}>{m}</option>)}
      </select>
      <select 
        className="time-select period-select"
        value={time.period}
        onChange={(e) => handleChange('period', e.target.value)}
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  )
}
