'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('DoctorLevels', [
      { name: '主任医师' },
      { name: '副主任医师' },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DoctorLevels', null, {});
  }
};
