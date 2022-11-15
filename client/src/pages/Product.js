import React from 'react'
import ViewProduct from '../components/ViewProduct'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const GetProduct = () => {
  let { id } = useParams()

  const [selectedProduct, setSelectedProduct] = useState()

  useEffect(() => {
    const apiCall = async () => {
      const response = await axios.get(`http://localhost:3001/products/${id}`)
      setSelectedProduct(response.data)
    }
    apiCall()
  }, [])
  return (
    <div>
      <div>{selectedProduct && <ViewProduct product={selectedProduct} />}</div>
    </div>
  )
}

export default GetProduct
