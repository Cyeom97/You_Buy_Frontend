import { Link } from 'react-router-dom'
import logo from '../Images/0Qxdovr - Imgur.jpg'

const Nav = ({ authenticated, user, handleLogout }) => {
  let authenticatedOptions
if (user) {
  authenticatedOptions = (
    <nav className="links">
      <Link to="/products">Home</Link>
      <Link onClick={handleLogout} to="/products">Sign Out</Link>
      <div className="dropdown">
        <button className="dropbtn">👤
      <i class="fa fa-caret-down"></i>
      </button>
      <div className="dropdown-content">
        <p>{user.name}</p>
        <Link to="/auth/update"></Link>
      </div>
      </div>
    </nav>
  )
}

const publicOptions = (
  <nav className="links">
    <Link to="/products">Home</Link>
    <Link to="/Register">Register</Link>
    <Link to="/Signin">Sign In</Link>
  </nav>
)

return (
  <header>
    <Link to="/products">
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