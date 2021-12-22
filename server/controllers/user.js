const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.createUser = async (req, res) => {
  try{
    await db.sequelize
    .query('CALL createUser (:new_username, :new_user_name, :new_user_surname, :new_user_password, :new_user_email, :new_user_type)', {
      replacements: {
        new_username: req.body.username,
        new_user_name: req.body.user_name,
        new_user_surname: req.body.user_surname,
        new_user_password: req.body.user_password,
        new_user_email: req.body.user_email,
        new_user_type: req.body.user_type || 'USER'
      }
    });
    res.status(200).json({"message":"user created"})
  }catch(err){
    res.status(500).json(err)
  }
};

exports.updateUser = async (req, res) => {
  try{
    await db.sequelize
    .query('CALL updateUser (:new_user_id, :new_username, :new_user_name, :new_user_surname, :new_user_password, :new_user_email, :new_user_type)', {
      replacements: {
        new_user_id: req.params.user_id,
        new_username: req.body.username,
        new_user_name: req.body.user_name,
        new_user_surname: req.body.user_surname,
        new_user_password: req.body.user_password,
        new_user_email: req.body.user_email,
        new_user_type: req.body.user_type
      }
    });
    res.status(200).json({"message":"user updated"})
  }
  catch(err){
    res.status(500).json(err)
  }
};

exports.deleteUser = async (req, res) => {
  try{
    await db.sequelize.query("CALL deleteUser(:user_id)", {
      replacements: {
        user_id: req.params.user_id
      }
    })
    res.status(200).json({"message":"user deleted"})
  }catch(err){
    res.status(500).json(err)
  }
};

exports.getUserInfo = async (req, res) => {
  try{
    const [userInfo] = await db.sequelize.query("CALL getUserInfo(:user_id)", {
      replacements: {
        user_id: req.params.user_id
      }
    })
    res.status(200).json(userInfo)
  }catch(err){
    res.status(500).json(err)
  }
};

exports.getListOfUsers = async (req, res) => {
  try{
    const userList = await db.sequelize.query("CALL getListOfUsers()")
    res.status(200).json(userList)
  }catch(err){
    res.status(500).json(err)
  }
};
