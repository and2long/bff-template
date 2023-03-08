'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      phoneNumber: { type: Sequelize.STRING, allowNull: true },
      introduction: { type: Sequelize.STRING, allowNull: true },
      username: { type: Sequelize.STRING, allowNull: false },
      birthday: { type: Sequelize.DATE, allowNull: true },
      gender: {
        type: Sequelize.ENUM(["male", "female", "unknown"]),
        allowNull: false,
        defaultValue: "unknown",
      }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Users');
  }
};
