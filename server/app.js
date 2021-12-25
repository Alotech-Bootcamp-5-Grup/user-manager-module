const express = require('express')
const db = require("./models")
const storedProcedures = require("./models/storedProcedures");
const userRoute = require("./routes/userRoute");
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT

// Generate tables and stored procedures
db.sequelize.sync()
storedProcedures()

// Middlewares
app.use(express.json());

//Cors
app.use(cors());

// Rooters
app.use("/user", userRoute);

// Listen App
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
