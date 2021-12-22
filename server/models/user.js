module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING(20),
      unique: true,
      allowNull: false,
    },
    user_name: {
      type: Sequelize.STRING(25),
      allowNull: false,
    },
    user_surname: {
      type: Sequelize.STRING(25),
      allowNull: false,
    },
    user_password: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    user_email: {
      type: Sequelize.STRING(80),
      unique: true,
      allowNull: false,
    },
    user_type: {
      type: Sequelize.ENUM('USER', 'ADMIN'),
      allowNull: false,
      defaultValue:'USER',
    }
  },{
    sequelize,
    modelName: 'User',
    timestamps: false
  });

  return User;
};
