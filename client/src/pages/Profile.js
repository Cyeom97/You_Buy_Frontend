import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Profile = ({ user, authenticated }) => {
  let { id } = useParams()
  const [products, setProducts] = useState([])
  const [updateAProduct, setUpdateAProduct] = useState([
    {
      name: '',
      description: '',
      image: '',
      price: '',
      saleId: ''
    }
  ])
  const [deleted, setDeleted] = useState({
    id: ''
  })
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

  const updateChange = (event, index) => {
    const updatedProduct = [...updateAProduct]
    updatedProduct[index][event.target.id] = event.target.value
    setUpdateAProduct(updatedProduct)
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

  const handleUpdate = async (event) => {
    event.preventDefault()
    let updateProduct = await axios.put(
      `http://localhost:3001/${id}`,
      updateAProduct
    )
    setProducts([products, updateProduct.data])
    setUpdateAProduct({ name: '', description: '', image: '', price: '' })
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    setDeleted({ ...deleted, [event.target.id]: event.target.value })
    let deleteProduct = await axios.delete(
      `http://localhost:3001/profile/${id}`,
      deleted
    )
    console.log(deleteProduct)
  }

  return user && authenticated ? (
    <div>
      <section className="container-grid">
        {products.map((product, index) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} className="img" />
            <h3>{product.description}</h3>
            <h3>{product.price}</h3>
            <div>
              <form onSubmit={handleUpdate} className="form-type">
                <label htmlFor="name">Name:</label>
                <input
                  id="name"
                  name="name"
                  value={updateAProduct.name}
                  onChange={(event) => updateChange(event, index)}
                ></input>
                <label htmlFor="image">Image URL:</label>
                <input
                  id="image"
                  value={updateAProduct.image}
                  onChange={(event) => updateChange(event, index)}
                ></input>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={updateAProduct.description}
                  onChange={(event) => updateChange(event, index)}
                ></textarea>
                <label htmlFor="price">Price:</label>
                <input
                  id="price"
                  value={updateAProduct.price}
                  onChange={(event) => updateChange(event, index)}
                ></input>
                <input
                  id="id"
                  value={(updateAProduct.saleId = product.id)}
                ></input>
                <button type="submit">Update Product</button>
                <button id="id" value={product.id} onClick={handleDelete}>
                  Delete
                </button>
              </form>
            </div>
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
