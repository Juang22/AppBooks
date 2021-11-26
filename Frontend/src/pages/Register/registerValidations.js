const validations = {
  // validate username, accepts only letters (lowercase and uppercase) or numbers, min 3 max 17
  isUserNameValid: function (userName) {
    const pattern = /^[a-zA-ZñÑ0-9]{3,17}$/;

    return pattern.test(userName) ? true : false;
  },

  // check if passwords match
  doesPasswordsMatch: function (firstPassword, secondPassword) {
    return firstPassword === secondPassword ? true : false;
  },

  // check if required fields are empty
  isRequired: function (firstPassword, secondPassword, userName) {
    return !firstPassword || !secondPassword || !userName;
  },

  // validate password
  isPasswordValid: function (pass) {
    // any character and at least 3 characteres
    const passwordPattern = /.{3,17}$/;

    return passwordPattern.test(pass) ? true : false;
  },
};

export default validations;
