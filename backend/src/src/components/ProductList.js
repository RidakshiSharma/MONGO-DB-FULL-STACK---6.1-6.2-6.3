import React, { useEffect, useState } from 'react'
import axios from 'axios'

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data)
        setLoading(false)
      })
      .catch(err => {
        setError('Failed to fetch products')
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading products...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map(p => (
          <li key={p.id} style={{
            border: '1px solid #ccc',
            margin: '10px 0',
            padding: '10px',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
          }}>
            <strong>{p.name}</strong><br />
            Price: ₹{p.price}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList
