module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define("token", {
    url: {
      type: Sequelize.JSON,
    },
    token: {
      type: Sequelize.TEXT,
    },
    ttl: {
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    user_ip: {
      type: Sequelize.STRING(60),
    }
  },{
    sequelize,
    modelName: 'Token',
    updatedAt: false
  });

  return Token;
};
