import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Profile = ({ user, authenticated }) => {
  let { id } = useParams()
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    ownerId: parseInt(id)
  })

  let navigate = useNavigate()

  useEffect(() => {
    const handleUser = async () => {
      let productResponse = await axios.get(
        `http://localhost:3001/profile/${id}`
      )
      setProducts(productResponse.data)
    }
    handleUser()
  }, [id])

  const handleChange = (event) => {
    setForm({ ...form, [event.target.id]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let newProduct = await axios.post(
      `http://localhost:3001/profile/${id}`,
      form
    )
    setProducts([...products, newProduct.data])
    setForm({ name: '', description: '', image: '', price: '' })
  }

  return user && authenticated ? (
    <div>
      <section className="container-grid">
        {products.map((product) => (
          <div>
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} className="img" />
            <h3>{product.description}</h3>
            <h3>{product.price}</h3>
          </div>
        ))}
      </section>
      <form onSubmit={handleSubmit} className="form-type">
        <label htmlFor="name">Name:</label>
        <input id="name" value={form.name} onChange={handleChange}></input>
        <label htmlFor="image">Image URL:</label>
        <input id="image" value={form.image} onChange={handleChange}></input>
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          value={form.description}
          onChange={handleChange}
        ></input>
        <label htmlFor="price">Price:</label>
        <input id="price" value={form.price} onChange={handleChange}></input>
        <button type="submit">Add Product</button>
      </form>
    </div>
  ) : (
    <div>
      <h3>Please Sign In</h3>
      <button onClick={() => navigate('/Signin')}>Sign In</button>
    </div>
  )
}

export default Profile
