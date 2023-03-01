'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Department', [
      { name: '内科' },
      { name: '外科' },
      { name: '骨科' },
      { name: '妇产科' },
      { name: '儿科' },
      { name: '眼科' },
      { name: '耳鼻喉科' },
      { name: '口腔科' },
      { name: '皮肤科' },
      { name: '神经内科' },
      { name: '疼痛科' },
      { name: '呼吸科' },
      { name: '消化科' },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Department', null, {});
  }
};
