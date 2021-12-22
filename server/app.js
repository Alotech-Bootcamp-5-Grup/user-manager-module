const express = require('express')

require('dotenv').config()

const app = express()
const port = 3000

// Middlewares
app.use(express.json());

// Listen App
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
