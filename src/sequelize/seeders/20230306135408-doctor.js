"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Doctors", [
      { userId: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed", hospitalId: "1", departmentId: "1", levelId: "1" },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Doctors", null, {});
  }
};
