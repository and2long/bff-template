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
      hospital: { type: Sequelize.Hospital },
      department: { type: Sequelize.Department },
      level: { type: Sequelize.DoctorLevel },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Doctor');
  }
};
