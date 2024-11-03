const express = require("express");

const sequelize = require("./db/database");

const app = express();
(async () => {
  await sequelize.sync();
})();
