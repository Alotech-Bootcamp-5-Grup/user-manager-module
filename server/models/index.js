const Sequelize = require('sequelize')

require('dotenv').config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.js")(sequelize, Sequelize);
db.tokens = require("./token.js")(sequelize, Sequelize);

db.users.hasMany(db.tokens, {
  foreignKey: 'user_id'
});

module.exports = db;
