import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SignInUser } from '../services/Auth'

const SignIn = (props) => {
  const [formValues, setFormValues] = useState({ email: '', password: '' })

  let { id } = useParams()
  let navigate = useNavigate()

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues({ email: '', password: '' })
    props.setUser(payload)
    props.toggleAuthenticated(true)
    navigate(`/profile/${id}`)
  }

  return (
    <div>
      <div className="signin-card">
        <form className="col" onSubmit={handleSubmit}>
          <div className="input-wrap">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={formValues.email}
              required
            />
          </div>
          <div className="input-wrap">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={formValues.password}
              required
            />
          </div>
          <button disabled={!formValues.email || !formValues.password}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignIn
