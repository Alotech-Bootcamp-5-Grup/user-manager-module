const db = require("../models");
const validator = require("../validators/userValidator");
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  const { value, error } = validator.createUserValidator(req.body);
  if (error) {
    return res.status(400).json({
      status: "fail",
      message: error.details[0].message,
    });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(value.user_password, saltRounds);
    await db.sequelize
      .query('CALL createUser (:new_username, :new_user_name, :new_user_surname, :new_user_password, :new_user_email, :new_user_type)', {
        replacements: {
          new_username: value.username,
          new_user_name: value.user_name,
          new_user_surname: value.user_surname,
          new_user_password: hashedPassword,
          new_user_email: value.user_email,
          new_user_type: value.user_type
        }
      });
    res.status(200).json({ "status": "success", "message": "user created" })
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err
    })
  }
};

exports.updateUser = async (req, res) => {
  const { value, error } = validator.updateUserValidator(req.body);
  if (error) {
    return res.status(400).json({
      status: "fail",
      message: error.details[0].message,
    });
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(value.user_password, saltRounds);
  try {
    await db.sequelize
      .query('CALL updateUser (:current_user_id, :new_username, :new_user_name, :new_user_surname, :new_user_password, :new_user_email, :new_user_type)', {
        replacements: {
          current_user_id: value.user_id,
          new_username: value.username,
          new_user_name: value.user_name,
          new_user_surname: value.user_surname,
          new_user_password: hashedPassword,
          new_user_email: value.user_email,
          new_user_type: value.user_type
        }
      });
    res.status(201).json({ "status": "success", "message": "user updated" })
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err
    })
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await db.sequelize.query("CALL deleteUser(:user_id)", {
      replacements: {
        user_id: req.params.user_id
      }
    })
    res.status(200).json({ "status": "success", "message": "user deleted" })
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err
    })
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const [userInfo] = await db.sequelize.query("CALL getUserInfo(:user_id)", {
      replacements: {
        user_id: req.params.user_id
      }
    })
    const user = {
      username: userInfo.username,
      user_name: userInfo.user_name,
      user_email: userInfo.user_email,
      user_surname: userInfo.user_surname,
      user_type: userInfo.user_type,
    }
    res.status(200).json({ "status": "success", user })
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err
    })
  }
};

exports.getListOfUsers = async (req, res) => {
  try {
    const userList = await db.sequelize.query("CALL getListOfUsers()")
    res.status(200).json({ "status": "success", userList })
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err
    })
  }
};
