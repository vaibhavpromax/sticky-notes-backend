"use strict";

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
      "note",
      [
        {
          note_id: "12334b6d-a70e-488c-82b9-50b9a3c79bbb",
          user_id: "22334b6d-a70e-488c-82b9-50b9a3c79bbb",
          title: "test note",
          content: "dummy note with content",
          is_public: true,
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
    await queryInterface.bulkDelete("note", null, {});  
  },
};
