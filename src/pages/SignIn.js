import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInUser } from '../services/Auth'
import { Link } from 'react-router-dom'

const SignIn = (props) => {
  const [formValues, setFormValues] = useState({ email: '', password: '' })

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
    navigate(`/profile/${payload.id}`)
  }

  return (
    <div>
      <h1>Hello</h1>
      <p>
        Sign in to your YouBuy account or{' '}
        <Link to="/Register">create an account</Link>
      </p>
      <div className="sign">
        <form className="col" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              className="email"
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={formValues.email}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              className="password"
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              required
            />
          </div>
          <div className="button1">
            <button
              className="regButton"
              disabled={!formValues.email || !formValues.password}
            >
              Sign In
            </button>
          </div>
          <a className="input-wrapper" href="/update">
            Reset Password
          </a>
        </form>
      </div>
    </div>
  )
}

export default SignIn
