
const jwt = require('jsonwebtoken');

// const axios = require('axios');

/* module.exports = (req, res, next) => {
  axios.get(`http://localhost:3010/token/${req.body.token}`)
  .then((rsp) => {
    console.log(rsp)
    if (!rsp.data.response){
      return res.status(500).json({
        "status":"fail",
        "message":"token expired"
      })
    }
    next();
  })
  .catch((err) => {
    return res.status(500).json({
      "status":"fail",
      "message":err
    })
  })
} */

module.exports = function (req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(401).send(global.StandartResponse(false, "x-access-token was not entered."))
  jwt.verify(token, process.env.jwt_private_key, function(err, decoded) {
    if (err) {
      res.status(401).send(global.StandartResponse(false, "Invalid Token."))
    }else{
      next();
    }
  });
}
