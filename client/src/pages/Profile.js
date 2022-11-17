import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Client from '../services/api'

const Profile = ({ user, authenticated }) => {
  let { id } = useParams()
  const [products, setProducts] = useState([])
  const [deleted, setDeleted] = useState()
  const [updateAProduct, setUpdateAProduct] = useState({})
  const [comments, setComments] = useState([])
  const [display, setDisplay] = useState('notdisplayed')
  const [formContainer, setFormContainer] = useState('notdisplayed')
  const [form, setForm] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    category: '',
    ownerId: parseInt(id)
  })

  let navigate = useNavigate()
  const showButton = (event) => {
    event.preventDefault()
    setDisplay('displayed')
  }

  const hideButton = (event) => {
    event.preventDefault()
    setDisplay('notdisplayed')
  }
  const showForm = () => {
    setFormContainer('form-container')
  }

  const hideForm = () => {
    setFormContainer('notdisplayed')
  }

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
    showForm()
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
    hideForm()
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
    setDeleted('')
  }

  return user && authenticated ? (
    <div>
      <form onSubmit={handleSubmit} className="form-add">
        <input
          id="name"
          className="input-add"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        ></input>
        <input
          id="image"
          className="input-add"
          placeholder="Image"
          value={form.image}
          onChange={handleChange}
        ></input>
        <input
          id="description"
          className="input-add"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        ></input>
        <select
          id="category"
          className="input-add"
          value={form.category}
          onChange={handleChange}
        >
          <option>-SELECT CATEGORY-</option>
          <option value="comics">Comics</option>
          <option value="collectible-cards">Collectible Cards</option>
          <option value="video-games">Video Games</option>
          <option value="tech">Tech</option>
          <option value="sports">Sports</option>
        </select>
        <input
          id="price"
          className="input-add"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        ></input>
        <button className="input-add1" type="submit">
          Add Product
        </button>
      </form>
      <div>
        <section className="container-grid">
          {products.map((product) => (
            <div
              className="containerP"
              onMouseEnter={(event) => showButton(event)}
              onMouseLeave={(event) => hideButton(event)}
              key={product.id}
            >
              <img src={product.image} alt={product.name} className="imgP" />
              <button
                className={display}
                id={product.id}
                value={product.id}
                onClick={handleClick}
              >
                Edit
              </button>
              <form onSubmit={handleDelete}>
                <button
                  className={display}
                  id={product.id}
                  value={product.id}
                  onClick={handleClick2}
                >
                  Delete Product
                </button>
                <h2>{product.name}</h2>
                <h3>{product.description}</h3>
                <h3>{product.price}</h3>
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
        <div className={formContainer}>
          <form onSubmit={handleUpdate} className="form-update">
            <p className="title">Update Your Product</p>
            <input
              id="name"
              className="form-fields"
              name="name"
              value={updateAProduct.name}
              placeholder="Name"
              onChange={updateChange}
            ></input>
            <input
              className="form-fields"
              id="image"
              value={updateAProduct.image}
              placeholder="Image"
              onChange={updateChange}
            ></input>
            <textarea
              id="description"
              className="form-fields"
              value={updateAProduct.description}
              placeholder="Description"
              onChange={updateChange}
            ></textarea>
            <input
              id="price"
              className="form-fields"
              value={updateAProduct.price}
              placeholder="price"
              onChange={updateChange}
            ></input>
            <button className="updateButton" onClick={handleClick1}>
              Update Product
            </button>
          </form>
        </div>
      </div>
<<<<<<< HEAD
=======
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
          <option value="Collectible Cards">Collectible Cards</option>
          <option value="Video Games">Video Games</option>
          <option value="Tech">Tech</option>
          <option value="Sports">Sports</option>
        </select>
        <label htmlFor="price">Price:</label>
        <input id="price" value={form.price} onChange={handleChange}></input>
        <button type="submit">Add Product</button>
      </form>
>>>>>>> 2544ef337ff4b00fa36cd585038a1018f482f2e8
    </div>
  ) : (
    <div>
      <h3>Please Sign In</h3>
      <button onClick={() => navigate('/Signin')}>Sign In</button>
    </div>
  )
}

export default Profile
