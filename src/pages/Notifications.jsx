import { useState } from 'react'
import { sendNotificationToRole } from '../services/apiServices.js'
import './Page.css'
import './Notifications.css'

export default function Notifications() {
  const [activeTab, setActiveTab] = useState('pawparent')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  const roles = [
    { id: 'pawParent', label: 'Paw Parent' },
    { id: 'volunteer', label: 'Volunteer' },
    { id: 'shelter', label: 'Shelter' },
    { id: 'brand', label: 'Brand' },
  ]

  const handleSendNotification = async (e) => {
    e.preventDefault()
    
    if (!title.trim() || !message.trim()) {
      setError('Please fill in all fields')
      return
    }

    try {
      setLoading(true)
      setError(null)
      const roleForApi = activeTab
      await sendNotificationToRole(roleForApi, title.trim(), message.trim())
      
      setSuccess(true)
      setTitle('')
      setMessage('')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      console.error('Error sending notification:', err)
      setError('Failed to send notification. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <h2 className="page-title">Notifications</h2>
      
      <div className="tabs-container">
        <div className="tabs">
          {roles.map(role => (
            <button
              key={role.id}
              className={`tab ${activeTab === role.id ? 'active' : ''}`}
              onClick={() => setActiveTab(role.id)}
            >
              {role.label}
            </button>
          ))}
        </div>
      </div>

      <div className="card notification-form">
        <h3>Send Notification to {roles.find(r => r.id === activeTab)?.label}</h3>
        
        {success && (
          <div className="alert alert-success">
            Notification sent successfully!
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSendNotification}>
          <div className="form-group">
            <label htmlFor="title">Notification Title</label>
            <input
              id="title"
              type="text"
              placeholder="Enter notification title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              placeholder="Enter notification message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-textarea"
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Notification'}
          </button>
        </form>
      </div>
    </div>
  )
}
