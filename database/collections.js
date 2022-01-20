const Client = require("./models/Client");

const models = {
  Client: Client.model,
};

const schemas = {
  Client: Client.schema,
};

module.exports = { models, schemas };
