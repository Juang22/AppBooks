require("./loadenv");
const express = require("express");
const erorrHandler = require("./utils/errorHandler.js");
const api = require("./config/api");
const cors = require("cors");

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(erorrHandler.jsonParseError);

app.use("/api/v1", api.v1);

// catch all other routes
app.use(erorrHandler.genericError);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
