const validations = {
  // validate email
  isValidEmail: function (email) {
    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{3}$/;
    if (email.length !== 0) return emailPattern.test(email);
    else {
      return true;
    }
    // letters and characteres at the begining , @, numbers and domain (com)
  },

  // validate first name, accepts only letter (lowercase and uppercase), min 3 max 17
  isFirstNameValid: function (firstName) {
    const namePattern = /^[a-zA-ZñÑ]{3,17}$/;

    return namePattern.test(firstName) || firstName === '' ? true : false;
  },

  // validate last name, accepts only letters (lowercase and uppercase), min 3 max 17
  isLastNameValid: function (lastName) {
    const pattern = /^[a-zA-ZñÑ]{3,17}$/;

    return pattern.test(lastName) || lastName === '' ? true : false;
  },

  // validate username, accepts only letters (lowercase and uppercase) or numbers, min 3 max 17
  isUserNameValid: function (userName) {
    const pattern = /^[a-zA-ZñÑ0-9]{3,17}$/;

    return pattern.test(userName) ? true : false;
  },

  // validate address
  isAddressValid: function (address) {
    // any character and at least 3 characteres
    const pattern = /.{3,17}$/;

    return pattern.test(address) || address === '' ? true : false;
  },

  // validate phone
  isPhoneValid: function (phone) {
    // at least 10 characteres
    const pattern = /[a-zA-Z0-9]{10,17}$/;

    return pattern.test(phone) || phone === '' ? true : false;
  },
};

export default validations;
