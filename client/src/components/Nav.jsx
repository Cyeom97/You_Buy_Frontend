import { Link } from 'react-router-dom'

const Nav = () => {
// if (user) {
//   authenticatedOptions = (
//     <nav>
//       <h3>Welcome</h3>
//       <Link to="/products">Home</Link>
//       <Link to="products">Sign Out</Link>
//     </nav>
//   )
// }

const publicOptions = (
  <nav>
    <Link to="/products">Home</Link>
    <Link to="/Register">Register</Link>
    <Link to="/Signin">Sign In</Link>
  </nav>
)

return (
  <header>
    <Link to="/prodcuts">
      <div>Hello</div>
    </Link>
    {publicOptions}
    {/* {authenticated && user ? authenticatedOptions : publicOptions} */}
  </header>
)
}

export default Nav