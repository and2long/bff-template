"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("AppointmentParticipants", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      participantId: {type: Sequelize.UUID, allowNull: false},
      appointmentId: {type: Sequelize.INTEGER, allowNull: false},
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
    return queryInterface.dropTable("AppointmentParticipants");
  }
};
