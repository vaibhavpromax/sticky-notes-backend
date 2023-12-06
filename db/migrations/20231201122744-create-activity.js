"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("activity", {
      activity_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      note_id: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      invite_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      action: {
        type: Sequelize.ENUM(
          "create",
          "update",
          "delete",
          "made_public",
          "made_private",
          "joined",
          "joined_using_invite"
        ),
        defaultValue: "create",
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
