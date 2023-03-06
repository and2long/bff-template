'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Hospitals', [
      { name: '山西医科大学第一医院' },
      { name: '山西省人民医院' },
      { name: '山西白求恩医院' },
      { name: '西安国际医学中心医院' },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Hospitals', null, {});
  }
};
