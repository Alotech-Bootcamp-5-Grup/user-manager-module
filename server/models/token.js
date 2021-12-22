module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define("token", {
    url: {
      type: Sequelize.JSON,
    },
    token: {
      type: Sequelize.TEXT,
    },
    ttl: {
      type: Sequelize.DATE,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    user_ip: {
      type: Sequelize.STRING(15),
    }
  },{
    sequelize,
    modelName: 'Token',
    updatedAt: false
  });

  return Token;
};
