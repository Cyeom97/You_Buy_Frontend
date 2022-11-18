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
  let navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    category: '',
    ownerId: id
  })

  //used to set time interval to help with getting useEffect to run again

  const [timeInterval, setTimeInterval] = useState(0)

  setTimeout(() => {
    setTimeInterval(timeInterval + 1)
  }, 2000)

  //use to help hide and display elements on the page

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

  //gets the products the user is the owner of

  useEffect(() => {
    const handleUser = async () => {
      let productResponse = await Client.get(`profile/${id}`)
      setProducts(productResponse.data)
    }
    handleUser()
  }, [timeInterval])

  // gets comments(communication) from the user who wants to purchase

  useEffect(() => {
    const handleUser = async () => {
      let productResponse = await Client.get(`comments`)
      setComments(productResponse.data)
    }

    handleUser()
  }, [])

  // handle logic for forms that handle updating, adding and deleting

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
    setForm({
      name: '',
      description: '',
      image: '',
      price: '',
      category: '',
      ownerId: id
    })
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
          <option value="toys">Toys</option>
          <option value="shoes">Shoes</option>
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
              <h2 className="products">{product.name}</h2>
              <h3 className="products">{product.description}</h3>
              <h3 className="products">{product.price}</h3>
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
              </form>
            </div>
          ))}
          <h1 className="messages">Messages</h1>
          <div className="comment-container">
            {comments.map((comment) =>
              comment.review.ownerId === user.id ? (
                <div className="comments" key={comment.id}>
                  <h3 className="comName">{comment.name}</h3>
                  <h3 className="comTitle">
                    Subject: Interested in {comment.review.name}
                  </h3>
                  <h3 className="comDescr">{comment.description}</h3>
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
    </div>
  ) : (
    <div>
      <h3>Please Sign In</h3>
      <button onClick={() => navigate('/Signin')}>Sign In</button>
    </div>
  )
}

export default Profile
