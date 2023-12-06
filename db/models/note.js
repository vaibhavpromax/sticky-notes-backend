"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Activity }) {
      this.belongsTo(User, { foreignKey: "user_id" });
      this.hasMany(Activity, { foreignKey: "note_id" });
    }
  }
  Note.init(
    {
      note_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      is_public: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "note",
      modelName: "Note",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Note;
};
