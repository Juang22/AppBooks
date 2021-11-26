const jwt = require("jsonwebtoken");

function JWTSignPromise(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.PRIVATE_KEY, (err, token) => {
      if (err) reject(err);

      resolve(token);
    });
  });
}

function JWTDecode(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
}

module.exports = { JWTSignPromise, JWTDecode };
