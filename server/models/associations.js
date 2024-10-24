const Templates = require("./Templates");
const Users = require("./Users");
const TemplateUser = require("./TemplateUser");
const TemplateQuestions = require("./TemplateQuestions");

Users.hasMany(Templates, {
  foreignKey: "authorId", // Используем authorId из модели Templates
  as: "templates", // Это будет алиас для доступа к шаблонам пользователя
});

// Каждый шаблон принадлежит одному пользователю
Templates.belongsTo(Users, {
  foreignKey: "authorId", // Используем authorId из модели Templates
  as: "author", // Алиас для доступа к автору шаблона
});

// Пользователь может иметь много шаблонов через промежуточную модель TemplateUser
Users.belongsToMany(Templates, {
  through: TemplateUser, // Определяем промежуточную модель
  foreignKey: "userId", // Используем userId из TemplateUser
  otherKey: "templateId", // Используем templateId из TemplateUser
  as: "templateUsers", // Алиас для доступа к шаблонам, связанным с пользователем
});

// Шаблон может иметь много пользователей через промежуточную модель TemplateUser
Templates.belongsToMany(Users, {
  through: TemplateUser, // Определяем промежуточную модель
  foreignKey: "templateId", // Используем templateId из TemplateUser
  otherKey: "userId", // Используем userId из TemplateUser
  as: "users", // Алиас для доступа к пользователям, связанным с шаблоном
});

Templates.hasMany(TemplateQuestions, {
  foreignKey: "templateId",
  as: "templateQuestions",
});
TemplateQuestions.belongsTo(Templates, {
  foreignKey: "templateId",
  as: "templates",
});

module.exports = { Users, Templates, TemplateUser, TemplateQuestions };
