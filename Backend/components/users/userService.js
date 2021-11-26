const db = require("../../config/db");
const bcrypt = require("bcrypt");
const { JWTSignPromise, JWTDecode } = require("../../utils/JWTPromise");
const customError = require("../../utils/customError");
const validation = require("../../utils/validations");

async function create(payload) {
  try {
    // req.body validations
    if (!validation.createUser(payload))
      throw customError.unprocessableEntry("Error on request body");

    const { username, password, passwordConfirm } = payload;

    // Check if username is unique
    if (await usernameExists(username))
      throw customError.unprocessableEntry(`username already exists`);

    // Add user
    const query = `INSERT INTO users (username, password) 
        VALUES ($1, $2) RETURNING id_user`;
    // Hash password
    const passwordHashed = await bcrypt.hash(password, 10);
    const params = [username, passwordHashed];
    const dbResponse = await db.query(query, params);

    // Sanity check
    if (dbResponse.length < 1)
      throw customError.internalServerError(`db error while adding user`);

    // return id_user
    return dbResponse[0];
  } catch (err) {
    throw err;
  }
}

async function login(payload) {
  try {
    // req.body validation
    if (!validation.loginUser(payload))
      throw customError.unprocessableEntry("Error on request body");

    const { username, password } = payload;
    //  get user's id and password from db
    let query = "SELECT id_user, password FROM users WHERE username = $1";
    const dbResponse = await db.query(query, [username]);

    // username in db validation
    if (dbResponse.length < 1)
      throw customError.unprocessableEntry(`username doesn't exist on db`);

    // password credentials
    const match = await bcrypt.compare(password, dbResponse[0].password);
    if (!match) throw customError.unprocessableEntry(`password doesn't match`);

    const user_id = dbResponse[0].id_user;

    // Create token when user logged in
    const token = await JWTSignPromise({ id: user_id });

    // Remove old token
    await removeToken(user_id);

    // Insert new token
    query = `INSERT INTO tokens (token, expiration_date, users_id_user)
              VALUES ($1, to_timestamp($2), $3)`;
    const secondToAdd = getTokenTime();
    const params = [
      token,
      Math.floor(Date.now()) / 1000 + secondToAdd,
      user_id,
    ];
    await db.query(query, params);

    // return for response
    return { username, token };
  } catch (err) {
    throw err;
  }
}

async function update(id, payload) {
  try {
    // Create query
    setParams = "";
    const params = [id];
    const validationObj = {};
    for (let key in payload) {
      if (payload[key]) {
        validationObj[key] = payload[key];
      }
    }

    const keys = Object.keys(validationObj);

    keys.forEach((param, index) => {
      params.push(validationObj[param]);
      setParams += `${param.toLowerCase()} = $${index + 2}`;
      setParams += ",";
    });

    setParams = setParams.slice(0, setParams.length - 1);

    // fields validation
    if (!validation.updateUser(validationObj))
      throw customError.unprocessableEntry("Error on request body");

    const query = `UPDATE users SET ${setParams} WHERE id_user = $1 RETURNING username`;

    const dbResponse = await db.query(query, params);
    return dbResponse;
  } catch (err) {
    throw err;
  }
}

async function getBooksByUsername(username) {
  try {
    // TODO: What to fetch
    const books = await db.query(
      `SELECT books.title,books.author, books.category, books.description, books.release_year, books.url_image FROM books 
        JOIN user_books 
        ON user_books.books_id_book = books.id_book
        JOIN users
        ON users.id_user = user_books.users_id_user
        WHERE users.username = $1;`,
      [username]
    );

    return books;
  } catch (err) {
    throw err;
  }
}

// Auxiliary functions
async function usernameExists(username) {
  try {
    const usernameCheck = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (!usernameCheck.length) return false;
  } catch (err) {
    throw customError.internalServerError(`db error`);
  }
  return true;
}

// Check and decode token
async function tokenVerification(req) {
  try {
    // Check if token exist
    if (!req.header("Authorization"))
      throw customError.unauthorized("No authorization token");
    const token = req.header("Authorization");

    const JWTContent = await JWTDecode(token);

    return JWTContent;
  } catch (err) {
    throw err;
  }
}

// Check if token is still valid
async function userAuthorization(username, id, token) {
  try {
    const query = `SELECT users.id_user, users.username, tokens.token, tokens.expiration_date FROM users
                  JOIN tokens
                  ON users.id_user = tokens.users_id_user
                  WHERE users.id_user= $1;`;
    const dbResponse = await db.query(query, [id]);

    // user has active tokens
    if (dbResponse.length < 1)
      throw customError.unauthorized("Token not on DB");

    // Check if url.username match with id from inside token

    if (username !== dbResponse[0].username)
      throw customError.unauthorized("Not user private page");

    // token in db match token in header
    if (token !== dbResponse[0].token)
      throw customError.unauthorized("Token doesn't match to db");

    // check if token in db still active
    const exp = Date.parse(dbResponse[0].expiration_date);
    const now = Math.floor(Date.now());

    // token expired
    if (now > exp) {
      // clean up old tokens
      await removeToken(id);

      throw customError.unauthorized("Expired token");
    }

    // everything correct
  } catch (err) {
    throw err;
  }
}

// Helper function to remove token from user id
async function removeToken(id) {
  try {
    query = `DELETE FROM tokens WHERE users_id_user = $1;`;
    await db.query(query, [id]);
  } catch (err) {
    throw err;
  }
}

// TODO: Move
function getTokenTime() {
  let hours = +process.env.TOKEN_DURATION_DAYS * 24;
  hours += +process.env.TOKEN_DURATION_HOURS;
  let minutes = hours * 60;
  minutes += +process.env.TOKEN_DURATION_MINUTES;
  let seconds = minutes * 60;
  return seconds;
}

async function getUserToUpdate(username) {
  try {
    const user = await db.query(
      `select first_name, last_name, email, phone, addresses_id_address 
      from users 
      where username = $1`,
      [username]
    );
    return user;
  } catch (err) {
    throw "error-fetching-data-for-user";
  }
}

module.exports = {
  getBooksByUsername,
  getUserToUpdate,
  create,
  login,
  update,
  tokenVerification,
  userAuthorization,
};
