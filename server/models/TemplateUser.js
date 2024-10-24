const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class TemplateUser extends Model {}

TemplateUser.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      primaryKey: true,
    },
    templateId: {
      type: DataTypes.INTEGER,
      references: {
        model: "templates",
        key: "id",
      },
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "TemplateUser",
    tableName: "templateUsers",
    timestamps: true,
  }
);

module.exports = TemplateUser;
