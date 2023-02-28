'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Hospital', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      location: { type: Sequelize.STRING, allowNull: true },
      latLong: { type: Sequelize.STRING, allowNull: true },
      introduction: { type: Sequelize.STRING, allowNull: true },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Hospital');
  }
};
