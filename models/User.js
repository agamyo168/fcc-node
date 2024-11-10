const Sequelize = require("sequelize");
const sequelize = require("../db/connect");
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");

const User = sequelize.define(
  "user",
  {
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
    token: {
      type: Sequelize.VIRTUAL,
      get() {
        return jwt.sign(
          { name: this.name, id: this.id },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_LIFETIME }
        );
      },
    },
    comparePassword: {
      type: Sequelize.VIRTUAL,
      get() {
        return async (value) => {
          const isCorrect = await bcrypt.compare(value, this.password);
          return isCorrect;
        };
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (user, options) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
      },
      beforeUpdate: async (user, options) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(user.password, salt);
          user.password = hashedPassword;
        }
      },
    },
  }
);

module.exports = User;
