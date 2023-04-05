"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Appointments", [
      {
        creatorId: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
        title: "远程诊疗会议第120期",
        introduction: "窦性心律不齐，心绞痛",
        startTime: "2023-04-06 09:00:00.000 +0800",
        endTime: "2023-04-06 10:30:00.000 +0800"
      },
      {
        creatorId: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
        title: "远程诊疗会议第121期",
        introduction: "心血管外科手术",
        startTime: "2023-04-08 09:00:00.000 +0800",
        endTime: "2023-04-08 11:00:00.000 +0800"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Appointments", null, {});
  }
};
