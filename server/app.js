const express = require('express')
const db = require("./models")
const storedProcedures = require("./models/storedProcedures");

require('dotenv').config()

const app = express()
const port = 3000

// Generate tables and stored procedures
db.sequelize.sync()
storedProcedures()

// Middlewares
app.use(express.json());

// Listen App
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
