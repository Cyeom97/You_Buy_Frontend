import { Link, useNavigate } from 'react-router-dom'
import logo from '../Images/0Qxdovr - Imgur.jpg'


const Nav = ({ authenticated, user, handleLogout }) => {
  const navigate = useNavigate()
  let authenticatedOptions
if (user) {
  authenticatedOptions = (
    <nav className="links">
      <div className="dropdown">
        <button className="dropbtn">👤</button>
        <div className="dropdown-content">
        <h3 className="drop">Welcome</h3>
        <p className="drop">{user.email}</p>
        <p className="update" onClick={() => navigate(-1)}>Back</p>
        </div>
      </div>
      <Link to="/">Home</Link>
      <Link onClick={handleLogout} to="/">Sign Out</Link>
    </nav>
  )
}

const publicOptions = (
  <nav className="links">
    <div className="dropdown">
      <button className="dropbtn">👤</button>
      <div className="dropdown-content">
        <h3 className="drop">Welcome</h3>
        <p className="drop" onClick={() => navigate(-1)}>Back</p>
      </div>
    </div>
    <Link to="/">Home</Link>
    <Link to="/Register">Register</Link>
    <Link to="/Signin">Sign In</Link>
    
  </nav>
)

return (
  <header className='sticky-header'>
    <Link to="/">
      <div className="navbar">
      <img className='logo'src={logo} alt="logo" />
        <img />
      </div>
    </Link>
    {authenticated && user ? authenticatedOptions : publicOptions}
  </header>
)
}

export default Nav