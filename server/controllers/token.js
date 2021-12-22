const db = require("../models");
const Token = db.tokens;
const Op = db.Sequelize.Op;

exports.getTokenList = async (req, res) => {
  try{
    const tokens = await Token.findAll()
    res.status(200).json(tokens)
  }catch(err){
    res.status(500).json(err)
  }
};
