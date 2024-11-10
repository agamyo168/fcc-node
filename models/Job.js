const Sequelize = require("sequelize");
const sequelize = require("../db/connect");
const User = require("./User");

const Job = sequelize.define("job", {
  position: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please provide a position",
      },
      len: [1, 100],
    },
  },
  company: {
    type: Sequelize.STRING,
    allowNull: false,

    validate: {
      notNull: {
        msg: "Please provide a company name",
      },
      len: [1, 50],
    },
  },
  status: {
    type: Sequelize.ENUM("interview", "declined", "pending"),
    defaultValue: "pending",
  },
  createdBy: {
    type: Sequelize.INTEGER,
    allowNull: false,

    notNull: {
      msg: "Please provide a user",
    },
    references: {
      model: User,
      key: "id",
    },
  },
});

module.exports = Job;
