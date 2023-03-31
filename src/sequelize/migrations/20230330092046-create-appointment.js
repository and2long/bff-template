"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Appointments", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      creatorId: { type: Sequelize.UUID, allowNull: false },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW")
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW")
      },
      title: { type: Sequelize.STRING, allowNull: false },
      introduction: { type: Sequelize.STRING, allowNull: false }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("Appointments");
  }
};
