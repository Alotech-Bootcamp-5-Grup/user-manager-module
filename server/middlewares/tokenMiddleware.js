const axios = require('axios');

require('dotenv').config();

module.exports = (role) => {
  return (req, res, next) => {
    axios.get(`${process.env.SSO_SERVER_URL}?redirectURL=${req.query.redirectURL}`,{
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
      if (err.response){
        return res.status(500).json({
          "status":"fail",
          "message":err.response.data
        })
      } else {
        return res.status(500).json({
          "status":"fail",
          "message":err
        })
      }
    })
  }
}
