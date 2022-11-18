import React from 'react'
import ViewProduct from '../components/ViewProduct'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BASE_URL } from '../services/api'

import axios from 'axios'

const GetProduct = () => {
  let { id } = useParams()

  const [selectedProduct, setSelectedProduct] = useState()
  const [form, setForm] = useState({
    name: '',
    description: '',
    productId: parseInt(id)
  })

  // gets all products

  useEffect(() => {
    const apiCall = async () => {
      const response = await axios.get(`${BASE_URL}products/${id}`)
      setSelectedProduct(response.data)
    }
    apiCall()
  }, [])

  // handles adding comment or "sending message to owner of product"
  const handleChange = (event) => {
    setForm({ ...form, [event.target.id]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let newComment = await axios.post(`${BASE_URL}comments`, form)
    setForm({ name: '', description: '' })
  }

  return (
    <div>
      <div>
        {selectedProduct && (
          <ViewProduct
            product={selectedProduct}
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  )
}

export default GetProduct
