import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/api'

const Category = () => {
  let { category } = useParams()
  let navigate = useNavigate()
  const [products, setProducts] = useState([])

  //grabs all products

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(`${BASE_URL}products`)
      setProducts(response.data)
    }
    getProducts()
  }, [])

  //assists with navigating to the selected product

  const viewProduct = (posts) => {
    navigate(`/products/${posts}`)
  }

  //used to replace the - in the url to match with the specifc products

  const value = category.replace('-', ' ')
  return (
    <div>
      <h1>{value.toUpperCase()}</h1>
      {products.map((product) =>
        value === product.category.toLowerCase() ? (
          <div
            className="category-list"
            onClick={() => {
              viewProduct(product.id)
            }}
          >
            <h3>{product.name}</h3>
            <img
              className="imgVC"
              src={product.image}
              alt={product.name}
              id="ride-image"
            />
          </div>
        ) : (
          <div></div>
        )
      )}
    </div>
  )
}

export default Category
