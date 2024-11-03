const Sequelize = require("sequelize");

// const sequelize = new Sequelize({
//   database: "jwt_schema",
//   username: "casaos",
//   password: "casaos",
//   dialect: "mysql",
//   host: "potato.server",
//   port: "3306",
// });

const sequelize = new Sequelize(
  "mysql://casaos:casaos@potato.server:3306/jwt_schema"
);

module.exports = sequelize;
