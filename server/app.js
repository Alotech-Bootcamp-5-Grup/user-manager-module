const express = require('express')
const cors = require('cors')
const db = require("./models");
const userRoute = require("./routes/userRoute");
const { createUserIfNotExist } = require('./test/services');

require('dotenv').config()

const app = express()
const port = process.env.PORT

// db connection
db.sequelize.sync();

// create user if doesn't exist
createUserIfNotExist();

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

module.exports = {
  app: app
}
