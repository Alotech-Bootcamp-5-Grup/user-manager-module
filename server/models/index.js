const Sequelize = require('sequelize')

require('dotenv').config()

// Veritabanı bağlantısını oluştur
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

// Boş bir obje oluştur
const db = {};

// Sequelize metodlarını objeye ata
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelleri oluştur
db.users = require("./user.js")(sequelize, Sequelize);
db.tokens = require("./token.js")(sequelize, Sequelize);

db.users.hasMany(db.tokens, {
  foreignKey: 'user_id'
});

const createProcedures = async () => {
  // Kullanıcı Oluştur - Stored Procedure
  await db.sequelize.query("DROP PROCEDURE IF EXISTS createUser")

  let createUserQuery = "CREATE PROCEDURE `createUser`("
  createUserQuery += "new_username VARCHAR(20), new_user_name VARCHAR(25), new_user_surname VARCHAR(25), new_user_password TEXT, "
  createUserQuery += "new_user_email VARCHAR(80), new_user_type ENUM('USER','ADMIN')) BEGIN INSERT INTO users("
  createUserQuery += "username, user_name, user_surname, user_password, "
  createUserQuery += "user_email, user_type) values("
  createUserQuery += "new_username, new_user_name, new_user_surname, new_user_password, "
  createUserQuery += "new_user_email, new_user_type); END;"
  await db.sequelize.query(createUserQuery)

  // Kullanıcı Bilgilerini Güncelle - Stored Procedure
  await db.sequelize.query("DROP PROCEDURE IF EXISTS updateUser")

  let updateUserQuery = "CREATE PROCEDURE `updateUser`("
  updateUserQuery += "user_id INT, new_username VARCHAR(20), new_user_name VARCHAR(25), new_user_surname VARCHAR(25), new_user_password TEXT, "
  updateUserQuery += "new_user_email VARCHAR(80), new_user_type ENUM('USER','ADMIN')) BEGIN UPDATE users SET "
  updateUserQuery += "username=new_username, user_name=new_user_name, user_surname=new_user_surname, user_password=new_user_password, "
  updateUserQuery += "user_email=new_user_email, user_type=new_user_type "
  updateUserQuery += "WHERE id=user_id; END;"
  await db.sequelize.query(updateUserQuery)

  // Kullanıcı Sil - Stored Procedure
  await db.sequelize.query("DROP PROCEDURE IF EXISTS deleteUser")
  await db.sequelize.query("CREATE PROCEDURE `deleteUser`(user_id INT) BEGIN DELETE FROM users WHERE id=user_id; END;")

  // Kullanıcı Listesini Çek - Stored Procedure
  await db.sequelize.query("DROP PROCEDURE IF EXISTS getListOfUsers")
  await db.sequelize.query("CREATE PROCEDURE `getListOfUsers`() BEGIN SELECT * FROM users; END;")

  // Kullanıcı Bilgilerini Çek - Stored Procedure
  await db.sequelize.query("DROP PROCEDURE IF EXISTS getUserInfo")
  await db.sequelize.query("CREATE PROCEDURE `getUserInfo`(user_id INT) BEGIN SELECT * FROM users WHERE id=user_id LIMIT 1; END;")
}

// Stored Procedureları oluştur
createProcedures();

module.exports = db;
