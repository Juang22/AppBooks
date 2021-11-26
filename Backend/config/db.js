// Proper way to initialize and share the Database object

// Loading and initializing the library:

const pgp = require("pg-promise")({
  // Initialization Options
});

const protocol = process.env.DBSERVER_PROTOCOL;

const host = process.env.DBSERVER_URI;

const port = process.env.DBSERVER_PORT;

const database = process.env.DBNAME;

const user = process.env.DBUSER;

const password = process.env.DBPASSWORD;

// Preparing the connection details:

const cn = `${protocol}://${user}:${password}@${host}:${port}/${database}`;

// Creating a new database instance from the connection details:

const db = pgp(cn);

// Exporting the database object for shared use:

module.exports = db;
