import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Client from '../services/api'

const Profile = ({ user, authenticated }) => {
  let { id } = useParams()
  const [products, setProducts] = useState([])
  const [deleted, setDeleted] = useState()
  const [updateAProduct, setUpdateAProduct] = useState({})
  const [comments, setComments] = useState([])
  const [form, setForm] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    category: '',
    ownerId: parseInt(id)
  })

  let navigate = useNavigate()

  useEffect(() => {
    const handleUser = async () => {
      let productResponse = await Client.get(`profile/${id}`)
      setProducts(productResponse.data)
    }

    handleUser()
  }, [id])

  useEffect(() => {
    const handleUser = async () => {
      let productResponse = await Client.get(`comments`)
      setComments(productResponse.data)
    }

    handleUser()
  }, [])

  const handleChange = (event) => {
    setForm({ ...form, [event.target.id]: event.target.value })
  }

  const updateChange = (event) => {
    setUpdateAProduct({
      ...updateAProduct,
      [event.target.id]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setUpdateAProduct({
      ...updateAProduct,
      [event.target.saleId]: event.target.defaultValue
    })
    let newProduct = await Client.post(`profile/${id}`, form)
    setProducts([...products, newProduct.data])
    setForm({ name: '', description: '', image: '', price: '', category: '' })
  }

  const handleClick = (event) => {
    event.preventDefault()
    setUpdateAProduct({
      ...updateAProduct,
      saleId: parseInt(event.currentTarget.id)
    })
  }

  const handleClick1 = (event) => {
    setUpdateAProduct({
      ...updateAProduct,
      [event.target.id]: event.currentTarget.id
    })
    handleUpdate()
  }
  const handleClick2 = (event) => {
    event.preventDefault()
    setDeleted(event.currentTarget.id)
    if (deleted) {
      handleDelete()
    }
  }

  const handleUpdate = async (event) => {
    event.preventDefault()
    let updateProduct = await Client.put(`profile/${id}`, updateAProduct)
    setProducts([products, updateProduct.data])
    setUpdateAProduct({
      name: '',
      description: '',
      image: '',
      price: '',
      saleId: ''
    })
  }

  const handleDelete = async () => {
    let response = await Client.delete(`profile/${deleted}`)
    const data = await response.data
    setProducts([products, data])
    console.log(response)
  }

  return user && authenticated ? (
    <div>
      <div className="flip-container">
        <section className="container-grid flipper">
          {products.map((product) => (
            <div key={product.id}>
              <h2>{product.name}</h2>
              <img src={product.image} alt={product.name} className="img" />
              <h3>{product.description}</h3>
              <h3>{product.price}</h3>
              <button id={product.id} value={product.id} onClick={handleClick}>
                Edit
              </button>
              <form onSubmit={handleDelete}>
                <button
                  id={product.id}
                  value={product.id}
                  onClick={handleClick2}
                >
                  Delete Product
                </button>
              </form>
            </div>
          ))}
          <div>
            {comments.map((comment) =>
              comment.review.ownerId === user.id ? (
                <div>
                  <h3>{comment.review.name}</h3>
                  <h3>{comment.name}</h3>
                  <h3>{comment.description}</h3>
                </div>
              ) : (
                <div></div>
              )
            )}
          </div>
        </section>
        <form onSubmit={handleUpdate} className="form-type back">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            value={updateAProduct.name}
            onChange={updateChange}
          ></input>
          <label htmlFor="image">Image URL:</label>
          <input
            id="image"
            value={updateAProduct.image}
            onChange={updateChange}
          ></input>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={updateAProduct.description}
            onChange={updateChange}
          ></textarea>
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            value={updateAProduct.price}
            onChange={updateChange}
          ></input>
          <button onClick={handleClick1}>Update Product</button>
        </form>
      </div>
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
        <label htmlFor="category">Category:</label>
        <select id="category" value={form.category} onChange={handleChange}>
          <option>-SELECT CATEGORY-</option>
          <option value="Comics">Comics</option>
          <option value="Collectible Cards">Collectable Cards</option>
          <option value="Video Games">Video Games</option>
          <option value="Tech">Tech</option>
          <option value="Sports">Sports</option>
        </select>
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
