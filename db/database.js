const Sequelize = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(process.env.MARIADB_URL);

module.exports = sequelize;
