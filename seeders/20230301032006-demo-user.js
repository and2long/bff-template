'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User', [
      {
        userId: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
        username: "and2long"
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  }
};
