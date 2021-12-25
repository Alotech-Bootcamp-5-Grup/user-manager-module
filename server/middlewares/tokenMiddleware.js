const axios = require('axios');

module.exports = (role) => {
  return (req, res, next) => {
    axios.get(`http://localhost:3010/token/?redirectURL=${req.query.redirectURL}`,{
      headers: {"x-access-token":req.headers["x-access-token"]}
    })
    .then((rsp) => {
      if(!role.includes(rsp.data.user_type)){
        return res.status(500).json({
          "status":"fail",
          "message":"you dont have permission to acces this page"
        })
      }
      next();
    })
    .catch((err) => {
      return res.status(500).json({
        "status":"fail",
        "message":err.response.data
      })
    })
  }
}
