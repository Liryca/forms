const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class TemplateQuestions extends Model {}

TemplateQuestions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(
        "singleLine",
        "multiLine",
        "positiveInteger",
        "checkbox"
      ),
      allowNull: false,
    },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    answers: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    templateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "templates",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "TemplateQuestions",
    tableName: "templateQuestions", // Название таблицы в базе данных
    timestamps: true,
  }
);

module.exports = TemplateQuestions;
