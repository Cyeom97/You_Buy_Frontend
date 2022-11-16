import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/api'
import Category from './Category'

const Home = () => {
  let navigate = useNavigate()

  const [posts, setPosts] = useState([])

  const [category, setCategory] = useState('')

  useEffect(() => {
    const apiCall = async () => {
      let response = await axios.get(`${BASE_URL}products`)
      console.log(response)
      setPosts(response.data)
    }
    apiCall()
  }, [])

  const viewProduct = (posts) => {
    navigate(`${posts}`)
  }
  const pickCategory = (category) => {
    setCategory(category)
  }
  return (
    <div className="homepage">
      <h1>Our Latest Selection!</h1>
      <section className="item-list">
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.name}</h2>
            <img
              style={{ border: 'solid' }}
              width="130px"
              height="130px"
              src={post.image}
              alt="Product"
              onClick={() => {
                viewProduct(post.id)
              }}
            ></img>
            <h3> {post?.description} </h3>
          </div>
        ))}
      </section>
      <h1>Categories</h1>
      <h3
        onClick={() => {
          pickCategory(' Collectible Cards')
        }}
      >
        Collectible Cards
      </h3>
      <h3
        onClick={() => {
          pickCategory('Video Games')
        }}
      >
        Video Games
      </h3>
      <h3
        onClick={() => {
          pickCategory('Comics')
        }}
      >
        Comics
      </h3>
      <h3
        onClick={() => {
          pickCategory('Tech')
        }}
      >
        Tech
      </h3>
      <h3
        onClick={() => {
          pickCategory('Sports')
        }}
      >
        Sports
      </h3>
      <Category product={posts} category={category} />
      <section className="welcome-signin">
        <button onClick={() => navigate('/signin')}>
          Click Here To Get Started
        </button>
      </section>
    </div>
  )
}

export default Home
