"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Note, User }) {
      this.belongsTo(Note, { foreignKey: "note_id" });
      this.belongsTo(User, { foreignKey: "user_id" });
    }
  }
  Activity.init(
    {
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
    },
    {
      sequelize,
      modelName: "Activity",
    }
  );
  return Activity;
};
