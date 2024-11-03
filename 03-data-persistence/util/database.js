const Sequelize = require("sequelize");
const sequelize = new Sequelize("casaos", "root", "casaos", {
  dialect: "mysql",
  host: "192.168.0.100",
});

module.exports = sequelize;
