const express = require("express");
require("dotenv").config();
require("express-async-errors");

const sequelize = require("./db/database");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const mainRouter = require("./routes/main");

const app = express();

// middleware
app.use(express.static("./public"));
app.use(express.json());
//Authentication middleware
//Routes go here
app.use("/api/v1", mainRouter);
//some other middlewares
//Handling page not found when no matching routes exist
app.use(notFoundMiddleware);
//Last middleware in the stack to handle the errors
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //Make sure database is connected then start the server.
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`Server is listening on port:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
