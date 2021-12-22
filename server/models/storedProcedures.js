const db = require("./index")

module.exports = () => {

  // Create User - Stored Procedure
  db.sequelize
  .query("DROP PROCEDURE IF EXISTS createUser")
  .then(()=>{
    let createUserQuery = "CREATE PROCEDURE `createUser`("
    createUserQuery += "new_username VARCHAR(20), new_user_name VARCHAR(25), new_user_surname VARCHAR(25), new_user_password TEXT, "
    createUserQuery += "new_user_email VARCHAR(80), new_user_type ENUM('USER','ADMIN')) BEGIN INSERT INTO users("
    createUserQuery += "username, user_name, user_surname, user_password, "
    createUserQuery += "user_email, user_type) values("
    createUserQuery += "new_username, new_user_name, new_user_surname, new_user_password, "
    createUserQuery += "new_user_email, new_user_type); END;"
    db.sequelize
    .query(createUserQuery)
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));

  // Update User - Stored Procedure
  db.sequelize
  .query("DROP PROCEDURE IF EXISTS updateUser")
  .then(()=>{
    let updateUserQuery = "CREATE PROCEDURE `updateUser`("
    updateUserQuery += "user_id INT, new_username VARCHAR(20), new_user_name VARCHAR(25), new_user_surname VARCHAR(25), new_user_password TEXT, "
    updateUserQuery += "new_user_email VARCHAR(80), new_user_type ENUM('USER','ADMIN')) BEGIN UPDATE users SET "
    updateUserQuery += "username=new_username, user_name=new_user_name, user_surname=new_user_surname, user_password=new_user_password, "
    updateUserQuery += "user_email=new_user_email, user_type=new_user_type "
    updateUserQuery += "WHERE id=user_id; END;"
    db.sequelize
    .query(updateUserQuery)
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));

  // Delete User - Stored Procedure
  db.sequelize
  .query("DROP PROCEDURE IF EXISTS deleteUser")
  .then(()=>{
    db.sequelize
    .query("CREATE PROCEDURE `deleteUser`(user_id INT) BEGIN DELETE FROM users WHERE id=user_id; END;")
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));

  // Get List of Users - Stored Procedure
  db.sequelize
  .query("DROP PROCEDURE IF EXISTS getListOfUsers")
  .then(()=>{
    db.sequelize
    .query("CREATE PROCEDURE `getListOfUsers`() BEGIN SELECT * FROM users; END;")
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));

  // Get User Info - Stored Procedure
  db.sequelize
  .query("DROP PROCEDURE IF EXISTS getUserInfo")
  .then(()=>{
    db.sequelize
    .query("CREATE PROCEDURE `getUserInfo`(user_id INT) BEGIN SELECT * FROM users WHERE id=user_id LIMIT 1; END;")
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));

}
