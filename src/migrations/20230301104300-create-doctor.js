"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Doctors", {
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
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("Doctors");
  }
};
