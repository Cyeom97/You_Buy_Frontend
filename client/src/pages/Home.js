import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
  let navigate = useNavigate()

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const apiCall = async () => {
      let response = await axios.get('http://localhost:3001/products')
      console.log(response.data.posts)
      setPosts(response.data)
    }
    apiCall()
  }, [])

  return (
    <div className="homepage">
      <h1>Our Latest Selection!</h1>
      <section>
        {posts.map((post) => (
          <div>
            <h2>{post.name}</h2>
            <img
              style={{ display: 'block', border: 'solid' }}
              width="130px"
              height="130px"
              src={post.image}
              alt="Product image"
            ></img>
            <h3> {post.description} </h3>
          </div>
        ))}
      </section>
      <section className="welcome-signin">
        <button onClick={() => navigate('/signin')}>
          Click Here To Get Started
        </button>
      </section>
    </div>
  )
}
export default Home
