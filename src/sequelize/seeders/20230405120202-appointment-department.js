"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("AppointmentDepartments", [
      { departmentId: "1", appointmentId: "1" },
      { departmentId: "2", appointmentId: "2" },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("AppointmentDepartments", null, {});
  }
};
