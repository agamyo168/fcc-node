const Sequelize = require("sequelize");
const sequelize = require("../db/connect");

const User = sequelize.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please provide a name",
      },
      len: [3, 50],
      notEmpty: {
        msg: "Name cannot be empty",
      },
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true, //creates a unique index
    /*the unique option is used to ensure that the values in a specific column (or a combination of columns) are unique across all rows in the database table.*/
    validate: {
      notNull: {
        msg: "Please provide email",
      },
      len: [3, 50],
      //RegEx for email
      // is: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      // validateEmail: (value) => {
      //   if (
      //     !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      //       value
      //     )
      //   )
      //     throw new Error("Please provide a valid email");
      // },
      isEmail: {
        msg: "invalid email",
      },
      notEmpty: {
        msg: "Email cannot be empty",
      },
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please provide a password",
      },
      notEmpty: {
        msg: "Password cannot be empty",
      },
      len: {
        args: [2], //Length is >= 2
        msg: "Password length is too short",
      },
    },
  },
});

module.exports = User;
