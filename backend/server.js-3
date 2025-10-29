const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 5000

app.use(cors())

const products = [
  { id: 1, name: 'Laptop', price: 75000 },
  { id: 2, name: 'Smartphone', price: 40000 },
  { id: 3, name: 'Headphones', price: 2500 },
  { id: 4, name: 'Keyboard', price: 1800 }
]

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`)
})
