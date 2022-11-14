import { Link } from 'react-router-dom'

const Nav = ({ authenticated, user, handleLogout }) => {
  let authenticatedOptions
if (user) {
  authenticatedOptions = (
    <nav className="links">
      <h3>Welcome</h3>
      <Link to="/products">Home</Link>
      <Link onClick={handleLogout} to="products">Sign Out</Link>
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
        <img />
      </div>
    </Link>
    {authenticated && user ? authenticatedOptions : publicOptions}
  </header>
)
}

export default Nav