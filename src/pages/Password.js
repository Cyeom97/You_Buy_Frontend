import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UpdateUserPassword } from '../services/Auth'
import { Link } from 'react-router-dom'

const ResetPassword = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  let navigate = useNavigate()

  //used to reset the users password

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await UpdateUserPassword(formValues)
    setFormValues({ email: '', password: '' })
    navigate(`/signin`)
  }

  return (
    <div>
      <h1>Hello</h1>
      <p>
        Reset the Password for your YouBuy account or{' '}
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
              placeholder="New Password"
              value={formValues.password}
              required
            />
          </div>
          <div className="button1">
            <button
              className="regButton"
              disabled={!formValues.email || !formValues.password}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
