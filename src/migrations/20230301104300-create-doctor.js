'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Doctor', {
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
      introduction: { type: Sequelize.STRING, allowNull: true },
      hospitalId: { type: Sequelize.INTEGER, allowNull: false },
      departmentId: {type: Sequelize.INTEGER, allowNull: false },
      levelId: { type: Sequelize.INTEGER, allowNull: false },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Doctor');
  }
};
