import { useState, useEffect } from 'react'
import DataTable from '../components/table/DataTable.jsx'
import Modal from '../components/common/Modal.jsx'
import TimeInput from '../components/common/TimeInput.jsx'
import { createTask, getAllVolunteers, getAllTasks } from '../services/apiServices'
import './Page.css'

export default function Tasks() {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [volunteers, setVolunteers] = useState([])
  const [tasks, setTasks] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    startTime: '',
    endTime: '',
    priority: 'Medium',
    location: '',
    description: '',
    reminder: '',
    notes: '',
    assignedVolunteer: ''
  })

  const columns = [
    { key: 'title', label: 'Task' },
    { key: 'category', label: 'Category' },
    { key: 'assignedVolunteer', label: 'Assignee', render: (v) => v?.name || 'N/A' },
    { key: 'status', label: 'Status', render: (v) => (
      <span className={`badge ${v?.toLowerCase() || 'pending'}`}>
        {(v || 'pending')[0].toUpperCase() + (v || 'pending').slice(1)}
      </span>
    ) },
    { key: 'priority', label: 'Priority', render: (v) => (
      <span className={`priority-tag ${v?.toLowerCase() || 'medium'}`}>
        {v || 'Medium'}
      </span>
    ) },
    { key: 'date', label: 'Due Date' },
  ]

  useEffect(() => {
    fetchVolunteers()
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setPageLoading(true)
      const data = await getAllTasks()
      setTasks(data.tasks || [])
    } catch (err) {
      console.error('Failed to fetch tasks', err)
    } finally {
      setPageLoading(false)
    }
  }

  const fetchVolunteers = async () => {
    try {
      const data = await getAllVolunteers()
      // Assuming API returns array of volunteers directly or in data property
      // Adjust based on actual API response structure if needed
      setVolunteers(Array.isArray(data) ? data : data.volunteers || [])
    } catch (err) {
      console.error('Failed to fetch volunteers', err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      await createTask(formData)
      setShowModal(false)
      // Reset form
      setFormData({
        title: '',
        category: '',
        date: '',
        startTime: '',
        endTime: '',
        priority: 'Medium',
        location: '',
        description: '',
        reminder: '',
        notes: '',
        assignedVolunteer: ''
      })
      alert('Task created successfully')
      fetchTasks()
    } catch (err) {
      console.error(err)
      alert('Failed to create task')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="page-title">Assign & Completed Tasks</h2>
        <button className="btn-primary" onClick={() => setShowModal(true)}>Create Task</button>
      </div>
      
      {pageLoading ? (
        <div className="card list-card">Loading tasks...</div>
      ) : (
        <DataTable title="Tasks" columns={columns} rows={tasks} />
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Create New Task"
        footer={
          <>
            <button className="modal-btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="modal-btn-primary" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Creating...' : 'Create Task'}
            </button>
          </>
        }
      >
        <div className="form-grid">
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Task Title" />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="">Select Category</option>
              <option value="Dog Walking">Dog Walking</option>
              <option value="Vet Visit">Vet Visit</option>
              <option value="Shelter Cleaning">Shelter Cleaning</option>
              <option value="Rescue Operation">Rescue Operation</option>
              <option value="Documentation">Documentation</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </div>
          <div className="form-group">
             <label>Priority</label>
             <select name="priority" value={formData.priority} onChange={handleChange}>
               <option value="Low">Low</option>
               <option value="Medium">Medium</option>
               <option value="High">High</option>
               <option value="Urgent">Urgent</option>
             </select>
          </div>
          <div className="form-group">
            <label>Start Time</label>
            <TimeInput name="startTime" value={formData.startTime} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>End Time</label>
            <TimeInput name="endTime" value={formData.endTime} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
          </div>
          <div className="form-group">
            <label>Assigned Volunteer</label>
            <select name="assignedVolunteer" value={formData.assignedVolunteer} onChange={handleChange}>
              <option value="">Select Volunteer</option>
              {volunteers.map(v => (
                <option key={v._id} value={v._id}>{v.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Reminder</label>
            <input type="text" name="reminder" value={formData.reminder} onChange={handleChange} placeholder="e.g., 30 mins before" />
          </div>
          <div className="form-group full-width">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3"></textarea>
          </div>
          <div className="form-group full-width">
            <label>Notes</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} rows="2"></textarea>
          </div>
        </div>
      </Modal>
    </div>
  )
}
