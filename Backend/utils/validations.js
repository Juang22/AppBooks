const Ajv = require("ajv");
const customError = require("./customError");

// TODO: More validations

// $data:true for passwordConfirm
const ajv = new Ajv({ $data: true });

function loginUser(body) {
  const schema = {
    type: "object",
    properties: {
      username: { type: "string", minLength: 3, maxLength: 17 },
      password: { type: "string", minLength: 3, maxLength: 17 },
    },
    required: ["username", "password"],
    additionalProperties: false,
  };

  const validate = ajv.compile(schema);
  const valid = validate(body);

  return valid;
}

// TODO add adress
function createUser(body) {
  const schema = {
    type: "object",
    properties: {
      username: { type: "string", minLength: 3, maxLength: 17 },
      password: { type: "string", minLength: 3, maxLength: 17 },
      passwordConfirm: {
        const: {
          $data: "1/password",
        },
        type: "string",
      },
    },
    required: ["username", "password", "passwordConfirm"],
    additionalProperties: false,
  };

  const validate = ajv.compile(schema);
  const valid = validate(body);
  return valid;
}

function updateUser(body) {
  const schema = {
    type: "object",
    properties: {
      first_name: { type: "string", minLength: 3, maxLength: 254 },
      last_name: { type: "string", minLength: 3, maxLength: 254 },
      email: { type: "string", minLength: 3, maxLength: 254 },
      phone: { type: "string", minLength: 3, maxLength: 254 },
      address: { type: "string", minLength: 3, maxLength: 254 },
    },
    anyOf: [
      { required: ["first_name"] },
      { required: ["last_name"] },
      { required: ["email"] },
      { required: ["phone"] },
      { required: ["address"] },
    ],
    required: [],
    additionalProperties: false,
  };

  const validate = ajv.compile(schema);
  const valid = validate(body);
  return valid;
}

module.exports = {
  createUser,
  updateUser,
  loginUser,
};
