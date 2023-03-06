'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Hospitals', [
      { name: '山西省人民医院', introduction: '山西省人民医院（山西卫生健康职业学院附属医院） \n创建于1953年，位于山西省太原市迎泽区双塔东街29号，是一所综合型三级甲等医院。' },
      { name: '山西医科大学第一医院' },
      { name: '山西白求恩医院' },
      { name: '西安国际医学中心医院' },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Hospitals', null, {});
  }
};
