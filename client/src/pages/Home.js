import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/api'

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
    navigate(`/categories/${category}`)
  }
  return (
    <div className="homepage">
      <h1>Our Latest Selection!</h1>
      <div className="items">
        <section className="item-list">
          {posts.map((post) => (
            <div key={post.id}>
              <h2>{post.name}</h2>
              <img
                src={post.image}
                className="product-image"
                alt="Product"
                onClick={() => {
                  viewProduct(post.id)
                }}
              ></img>
              <h3> {post?.description} </h3>
            </div>
          ))}
        </section>
      </div>
      <h1>Categories</h1>
      <div className="categories">
        <div
          className="category"
          onClick={() => {
            pickCategory('collectible-cards')
          }}
        >
          <img
            className="imgC"
            width="200"
            height="200"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.rULfzCMPuLDPQf8YvqJTBAHaH-%26pid%3DApi&f=1&ipt=52ce58b0d7545617f518b946c47f9168e1af86180ca0ecbe7a501c90cd21f1b1&ipo=images"
            alt="shoes"
          />
          <h3>Collectible Cards</h3>
        </div>
        <div
          className="category"
          onClick={() => {
            pickCategory('video-games')
          }}
        >
          <img
            className="imgC"
            width="200"
            height="200"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.6aOz9fF5zIPBNgsy7g7tMwHaJ4%26pid%3DApi&f=1&ipt=13e077f1df564bda98149e1d7d292d85fb5b8978125b4c8c66f5fd47c1a88050&ipo=images"
            alt="shoes"
          />
          <h3>Video Games</h3>
        </div>
        <div
          className="category"
          onClick={() => {
            pickCategory('comics')
          }}
        >
          <img
            className="imgC"
            width="200"
            height="200"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.gakXoRJD7j6odRn1E_riWAHaJv%26pid%3DApi&f=1&ipt=0ccf18f19967934b61709c57ba93bd1b152f8d8cbfa45bd859a2aeab92650911&ipo=images"
            alt="shoes"
          />
          <h3>Comics</h3>
        </div>
        <div
          className="category"
          onClick={() => {
            pickCategory('tech')
          }}
        >
          <img
            className="imgC"
            width="190"
            height="190"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.BT0-uifBx62ueVrcfQOx-QHaJi%26pid%3DApi&f=1&ipt=05d97bd2a13c9ed6999720c12eec3bd9497bed368ca7cbe4c33f9c7762b63c97&ipo=images"
            alt="shoes"
          />
          <h3>Tech</h3>
        </div>
        <div
          className="category"
          onClick={() => {
            pickCategory('sports')
          }}
        >
          <img
            className="imgC"
            width="200"
            height="200"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.V52nQ_3JN-PaPH8-v7hsAAHaE9%26pid%3DApi&f=1&ipt=cd722800fb57d1a5a0ff091b74566f79ef6324e8bf397970866e20a5d0e71ee5&ipo=images"
            alt="shoes"
          />
          <h3>Sports</h3>
        </div>
        <div
          className="category"
          onClick={() => {
            pickCategory('toys')
          }}
        >
          <img
            className="imgC"
            width="200"
            height="200"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.zTk1huDKRyAR524SkXflyQHaHa%26pid%3DApi&f=1&ipt=4804a533e2548fbe645ba739cd863f97b832ca2b68aeffa36a54cd94620267cf&ipo=images"
            alt="shoes"
          />
          <h3>Toys</h3>
        </div>
        <div
          className="category"
          onClick={() => {
            pickCategory('shoes')
          }}
        >
          <img
            className="imgC"
            width="200"
            height="200"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.FdYlXyu5QBOQkrckVdT0wQHaHa%26pid%3DApi&f=1&ipt=0beeef9ababdc25f22c58425446a97587fa7854fb1752e07daaf8fcd39bb2519&ipo=images"
            alt="shoes"
          />
          <h3>Shoes</h3>
        </div>
      </div>
    </div>
  )
}

export default Home
