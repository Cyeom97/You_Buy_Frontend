import React from 'react'
import ViewProduct from '../components/ViewProduct'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BASE_URL } from '../services/api'

import axios from 'axios'

const GetProduct = () => {
  let { id } = useParams()

  const [selectedProduct, setSelectedProduct] = useState()

  useEffect(() => {
    const apiCall = async () => {
      const response = await axios.get(`${BASE_URL}/products/${id}`)
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
