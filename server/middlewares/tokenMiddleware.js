const axios = require('axios');

module.exports = (req, res, next) => {
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
}
