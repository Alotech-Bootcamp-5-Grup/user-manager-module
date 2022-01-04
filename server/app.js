const express = require('express')
const cors = require('cors')
const db = require("./models");
const userRoute = require("./routes/userRoute");
const { createUserIfNotExist } = require('./test/services');

require('dotenv').config()

const app = express()
const port = process.env.PORT

// DB bağlantısı
db.sequelize.sync();

// Varsayılan kullancıyı oluştur
createUserIfNotExist();

// Middlewares
app.use(express.json());

// Cors
app.use(cors());

// Routers
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

module.exports = {
  app: app
}
