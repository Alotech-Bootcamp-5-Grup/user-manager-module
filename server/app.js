const express = require('express')
const cors = require('cors')
const dbUtils = require("./models/utils");
const userRoute = require("./routes/userRoute");

require('dotenv').config()

const app = express()
const port = process.env.PORT


// Middlewares
app.use(express.json());

//Cors
app.use(cors());

// Rooters
app.use("/user", userRoute);

// Listen App
dbUtils(()=>{
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  })
})


module.exports = {
  app: app
}
