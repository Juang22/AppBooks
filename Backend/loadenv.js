const dotenv = require("dotenv");
const path = require("path");

try {
  let env = process.env.NODE_ENV;
  switch (env) {
    case "dev":
      dotenv.config({ path: path.resolve(".env.dev") });
      break;
    case "qa":
      dotenv.config({ path: path.resolve(".env.qa") });
      break;
    case "prod":
      dotenv.config({ path: path.resolve(".env.prod") });
      break;
    default:
      dotenv.config({ path: path.resolve(".env.dev") });
      break;
  }
} catch (err) {
  dotenv.config({ path: path.resolve(".env.dev") });
}
