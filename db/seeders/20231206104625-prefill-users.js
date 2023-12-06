"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "user",
      [
        {
          user_id: "22334b6d-a70e-488c-82b9-40b9a3c79bbb",
          username: "admin",
          password: bcrypt.hashSync("admin", 12),
          is_admin: true,
        },
        {
          user_id: "22334b6d-a70e-488c-82b9-50b9a3c79bbb",
          username: "test_user",
          password: bcrypt.hashSync("user", 12),
          is_admin: false,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("user", null, {});
  },
};
