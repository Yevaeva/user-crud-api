const User = require("./models/User");

const models = {
  User: User.model,
};

const schemas = {
  User: User.schema,
};

module.exports = { models, schemas };
