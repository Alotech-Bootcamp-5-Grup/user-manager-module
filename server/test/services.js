const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
require("dotenv").config();
// const axios = require('axios');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

exports.deleteAllUsers = async () => {
  try {
    await sequelize.query("DELETE FROM users");
    await setAutoIncrement();
  } catch (err) {
    console.log("users error ", err);
  }
};
exports.deleteTokens = async () => {
  try {
    await sequelize.query("DELETE FROM tokens");
  } catch (err) {
    console.log("tokens error ", err);
  }
};
const setAutoIncrement = async () => {
  try {
    await sequelize.query("ALTER TABLE users AUTO_INCREMENT = 1");
  } catch (err) {
    console.log("tokens error ", err);
  }
};

exports.createUser = async (user) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.user_password, saltRounds);

    const response = await sequelize.query(
      "CALL createUser (:new_username, :new_user_name, :new_user_surname, :new_user_password, :new_user_email, :new_user_type)",
      {
        replacements: {
          new_username: user.username,
          new_user_name: user.user_name,
          new_user_surname: user.user_surname,
          new_user_password: hashedPassword,
          new_user_email: user.user_email,
          new_user_type: user.user_type,
        },
      }
    );
    console.log("here createUser response", JSON.stringify(response));
  } catch (err) {
    console.log("createuser " + err);
  }
};


/* exports.authUser = async (username, password) => {
  const url = "http://localhost:3010?redirectURL=http://localhost:3011";
  const params = JSON.stringify({
    "username": username,
    "user_password": password
  });
  const response = await axios.post(url, params, {
    "headers": {
      "content-type": "application/json",
    },
  })
  return response.data;
}; */

/* 
exports.fetchRequest = async () => {
  const response = await fetch('http://localhost:3010?redirectURL=http://localhost:3011', {
    method: 'post',
    body: JSON.stringify({
      "username": username,
      "user_password": password
    }),
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  console.log("fetchRequest " + data);
}
 */
