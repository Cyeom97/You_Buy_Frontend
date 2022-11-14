import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Profile = ({ user, authenticated }) => {
  const [aUser, setAUser] = useState([])
  const [products, setProducts] = useState([])
  let { id } = useParams()
  let navigate = useNavigate()

  const viewProduct = (oneProduct) => {
    navigate(`${oneProduct}`)
  }

  useEffect(() => {
    const handleUser = async () => {
      let productResponse = await axios.get(
        `http://localhost:3001/products/${id}`
      )
      setProducts(productResponse.data)
    }
    handleUser()
  }, [id])

  return user & authenticated ? (
    <div>
      <section className="container-grid">
        {products.map((product) => (
          <div>
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} className="img" />
          </div>
        ))}
      </section>
    </div>
  ) : (
    <div>
      <h3>Please Sign In</h3>
      <button onClick={() => navigate('/Signin')}>Sign In</button>
    </div>
  )
}

export default Profile
