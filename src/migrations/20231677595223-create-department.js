'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Department', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      introduction: { type: Sequelize.STRING, allowNull: true },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Department');
  }
};
