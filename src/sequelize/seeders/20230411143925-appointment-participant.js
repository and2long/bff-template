"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("AppointmentParticipants", [
      {participantId: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed", appointmentId: "1"},
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("AppointmentParticipants", null, {});
  }
};
