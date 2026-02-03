import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PawLogo from '../components/logo/PawLogo.jsx'
import { loginUser } from '../services/apiServices'
import './Login.css'
import { ArrowRight, Lock, Mail, Loader } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await loginUser(email, password)
      // Assuming successful login if no error is thrown
      localStorage.setItem('cp_auth', 'true')
      if (data?.token) {
        localStorage.setItem('token', data.token)
      }
      if (data?.user) {
        localStorage.setItem('user', JSON.stringify(data.user))
      }
      if (data?.role) {
        localStorage.setItem('role', data.role)
      }
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-brand">
          <div className="logo-wrapper">
            <PawLogo size={40} />
          </div>
          <div>
            <div className="app-name">Connecting Paws</div>
            <div className="app-sub">Admin Dashboard</div>
          </div>
        </div>

        <div className="login-header">
          <h2>Sign in</h2>
          <p>Continue to your admin panel.</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrap">
              <Mail size={18} className="input-ico" />
              <input
                type="email"
                id="email"
                placeholder="admin@connectingpaws.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrap">
              <Lock size={18} className="input-ico" />
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <button type="button" className="link-btn" onClick={() => {}}>
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            {loading ? <Loader className="animate-spin" size={18} /> : <ArrowRight size={18} />}
          </button>
        </form>
      </div>

      <div className="login-footer">
        © {new Date().getFullYear()} Connecting Paws. All rights reserved.
      </div>
    </div>
  )
}
