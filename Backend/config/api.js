const express = require("express");
const v1 = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const usersRouter = require("../components/users/userRouter");

v1.use("/users", usersRouter);
v1.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = {
  v1,
};
